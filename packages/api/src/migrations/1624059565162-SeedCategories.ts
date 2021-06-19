import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedCategories1624059565162 implements MigrationInterface {
  categories = [
    { name: "Technology" },
    { name: "News & Politics" },
    { name: "Sports" },
    { name: "Comedy" },
    { name: "Science" },
    { name: "Education" },
    { name: "Religion" },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const category of this.categories) {
      queryRunner.query(
        `
        insert into category(name)
        values($1);
        `,
        [category.name]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
      delete from category
      where name = any($1);
      `,
      [this.categories.map((x) => x.name)]
    );
  }
}
