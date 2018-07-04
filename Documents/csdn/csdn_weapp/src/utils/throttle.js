export default function(fn, wait = 1000) {
  let _lastTime = null
  return function() {
    const _newTime = Date.now()
    if (!_lastTime || _newTime - _lastTime >= wait) {
      fn.apply(this, arguments)
    }
    _lastTime = _newTime
  }
}
