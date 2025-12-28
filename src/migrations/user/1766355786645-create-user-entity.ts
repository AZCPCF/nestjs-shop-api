import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1766355786645 implements MigrationInterface {
  name = 'CreateUserEntity1766355786645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "displayName" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
