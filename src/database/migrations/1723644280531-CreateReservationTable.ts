import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReservationTable1723644280531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "reservation",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment"
                },
                {
                  name: "Name",
                  type: "varchar"
                },
                {
                  name: "last_name",
                  type: "varchar"
                },
                {
                  name: "Comensales",
                  type: "int"
                },
                {
                  name: "Menu",
                  type: "varchar"
                },
                {
                  name: "Carta",
                  type: "varchar",
                  isNullable: true,
              },
                {
                  name: "user_id",
                  type: "int"
                },
                {
                  name: "table",
                  type: "int"
                },
                {
                  name: "date",
                  type: "datetime"
                },
              ],
              foreignKeys: [
                {
                  columnNames: ["user_id"],
                  referencedTableName: "user",
                  referencedColumnNames: ["id"],
                },
              ]
            }));
          true
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("reservation");
    }

}
