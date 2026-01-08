import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateFields1767866024951 implements MigrationInterface {
    name = 'AddDateFields1767866024951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
    }

}
