import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIsActiveColumn1691334829819 implements MigrationInterface {
    name = 'AddedIsActiveColumn1691334829819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "is_active" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "is_active"`);
    }

}
