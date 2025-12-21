import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueUserEmail1766356953476 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_users_email" UNIQUE ("email");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP CONSTRAINT "UQ_users_email";
        `);
    }

}