// A page keeps its viewport dimensions; spacing belongs between page frames.
function getSpaceBetween (value) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function getPageSize (viewport, spaceBetween) {
  return viewport + getSpaceBetween(spaceBetween)
}

module.exports = { getSpaceBetween, getPageSize }
