/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 4/4/2020
 * Time: 9:42 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import * as knex from 'knex'

process.env.MYSQL_HOST = 'localhost';
process.env.MYSQL_PORT = '3306';
process.env.DB_NAME = 'lucid';
process.env.MYSQL_USER = 'root';
process.env.MYSQL_PASSWORD = '123123As';

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST as string,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.DB_NAME as string,
        user: process.env.MYSQL_USER as string,
        password: process.env.MYSQL_PASSWORD as string,
    },
    useNullAsDefault: true,
});

async function main() {
    const hasUsersTable = await db.schema.hasTable('users')
    if ( ! hasUsersTable ) {
        await db.schema.createTable('users', (table) => {
            table.increments()
            table.string('name')
        })

        await db.table('users').insert({
            name: 'nguyen',
        });
    }

    console.log(await db.from('users').first());
}

main();
