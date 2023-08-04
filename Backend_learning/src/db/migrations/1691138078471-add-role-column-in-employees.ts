import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumnInEmployees1691138078471 implements MigrationInterface {
    name = 'AddRoleColumnInEmployees1691138078471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
