-- CreateTable
CREATE TABLE "ReactionCount" (
    "id" TEXT NOT NULL,
    "draftId" TEXT NOT NULL,
    "type" "ReactionType" NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReactionCount_pkey" PRIMARY KEY ("id")
);

CREATE FUNCTION reaction_count() RETURNS TRIGGER
LANGUAGE plpgsql AS
$$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE "ReactionCount"
        SET count = count + 1
        WHERE "draftId" = NEW."draftId" AND "type" = NEW."type";
    ELSEIF (TG_OP = 'DELETE') THEN
        UPDATE "ReactionCount"
        SET count = count - 1
        WHERE "draftId" = OLD."draftId" AND "type" = OLD."type";
    END IF;
    RETURN NULL;
END;
$$;

-- create three react_count rows on new draft
CREATE FUNCTION populate_counts() RETURNS TRIGGER
LANGUAGE plpgsql AS
$$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO "ReactionCount" ("draftId", "type", "count")
        VALUES (NEW.id, 'Favorite', 0);

        INSERT INTO "ReactionCount" ("draftId", "type", "count")
        VALUES (NEW.id, 'Bookmark', 0);

        INSERT INTO "ReactionCount" ("draftId", "type", "count")
        VALUES (NEW.id, 'Share', 0);
    END IF;
    RETURN NULL;
END;
$$;

CREATE TRIGGER reaction_count_insert
  AFTER INSERT ON "Draft"
  FOR EACH ROW EXECUTE PROCEDURE populate_counts();

CREATE CONSTRAINT TRIGGER sync_reaction_count
  AFTER INSERT OR DELETE ON "Reaction"
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW EXECUTE PROCEDURE reaction_count();

-- CREATE TRIGGER reaction_count_trunc 
--   AFTER TRUNCATE ON "Draft"
--   FOR EACH STATEMENT EXECUTE PROCEDURE reaction_count();