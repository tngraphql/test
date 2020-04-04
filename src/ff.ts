/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/21/2020
 * Time: 8:59 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Profiler } from '@adonisjs/profiler/build/src/Profiler';
import { FakeLogger } from '@adonisjs/logger/build/standalone'

const logger = new FakeLogger({ enabled: true, level: 'trace', name: 'adonis' })

let packet: any = null

function subscriber (node: any) {
    packet = node
}

const profiler = new Profiler(__dirname, logger, {})
profiler.process(subscriber)

const req = profiler.create('http_request', { id: '123' })
req.end();

console.log(packet);