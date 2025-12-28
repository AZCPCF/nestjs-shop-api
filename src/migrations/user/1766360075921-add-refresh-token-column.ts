import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenColumn1766360075921 implements MigrationInterface {
  name = 'AddRefreshTokenColumn1766360075921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
