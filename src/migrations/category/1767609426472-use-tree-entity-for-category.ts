import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseTreeEntityForCategory1767609426472
  implements MigrationInterface
{
  name = 'UseTreeEntityForCategory1767609426472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "parentId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_420d9f679d41281f282f5bc7d0" ON "categories" ("slug") `,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_dc67f6a82852c15ec6e4243398d" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea1e9c4eea91160dfdb4318778" ON "categories_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_51fff5114cc41723e8ca36cf22" ON "categories_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d" FOREIGN KEY ("id_ancestor") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_closure" ADD CONSTRAINT "FK_51fff5114cc41723e8ca36cf227" FOREIGN KEY ("id_descendant") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_51fff5114cc41723e8ca36cf227"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_closure" DROP CONSTRAINT "FK_ea1e9c4eea91160dfdb4318778d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_51fff5114cc41723e8ca36cf22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ea1e9c4eea91160dfdb4318778"`,
    );
    await queryRunner.query(`DROP TABLE "categories_closure"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_420d9f679d41281f282f5bc7d0"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
