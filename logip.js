const os = require('os')
var ifaces = os.networkInterfaces()
module.exports = (port) => {
  Object.keys(ifaces).forEach(ifname => {
    var alias = 0
    ifaces[ifname].forEach(iface => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }
      if (alias >= 1) {
        // Log computer's local IP address
        console.log(`visit: http://${iface.address}:${port}`)
      } else {
        // Log computer's local IP address
        console.log(`visit: http://${iface.address}:${port}`)
      }
      ++alias
    })
  })
}
