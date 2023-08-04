import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPassword1691125765036 implements MigrationInterface {
    name = 'AddedPassword1691125765036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
    }

}
