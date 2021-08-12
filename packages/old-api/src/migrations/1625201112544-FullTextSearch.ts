import { MigrationInterface, QueryRunner } from "typeorm";

export class FullTextSearch1625201112544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        update article set document = to_tsvector(title);
        
        create index document_idx on article
        using gin (document);

        create function article_tsvector_trigger() returns trigger as $$
        begin
            new.document := to_tsvector(new.title);
            return new;
        end
        $$ language plpgsql;

        create trigger tsvectorupdate before insert or update
        on article for each row execute procedure article_tsvector_trigger();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {queryRunner.query("drop index document_idx on article");}
}
