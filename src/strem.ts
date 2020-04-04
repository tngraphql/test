/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/21/2020
 * Time: 7:33 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
async function main() {
// create the datadog destination stream
    const datadog = require('pino-datadog/src/index');
    const pinoms = require('pino-multi-stream')
    const pino = require('pino')
    const writeStream = await datadog.createWriteStream()
// create pino loggger
    const logger = pino({ stream: [writeStream] })
// log some events
    logger.info('Informational message')
    // logger.error(new Error('things got bad'), 'error message')

}

main();