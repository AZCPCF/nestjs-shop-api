import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductEntity1767621126898 implements MigrationInterface {
    name = 'CreateProductEntity1767621126898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_status_enum" AS ENUM('draft', 'published')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "status" "public"."products_status_enum" NOT NULL DEFAULT 'draft', CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_status_enum"`);
    }

}
