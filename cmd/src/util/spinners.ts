type key = 'hexagon' | 'dots' | 'dots2' |
    'dots3' | 'dots4' | 'dots5' |
    'dots6' | 'dots7' | 'dots8' |
    'dots9' | 'dots10' | 'dots11' |
    'line' | 'line2' | 'pipe' |
    'simpleDots' | 'simpleDotsScrolling' | 'star' |
    'star2' | 'flip' | 'hamburger' |
    'growVertical' | 'growHorizontal' | 'balloon' |
    'balloon2' | 'noise' | 'bounce' |
    'boxBounce' | 'boxBounce2' | 'triangle' |
    'arc' | 'circle' | 'squareCorners' |
    'circleQuarters' | 'circleHalves' | 'squish' |
    'toggle' | 'toggle2' | 'toggle3' |
    'toggle4' | 'toggle5' | 'toggle6' |
    'toggle7' | 'toggle8' | 'toggle9' |
    'toggle10' | 'toggle11' | 'toggle12' |
    'toggle13' | 'arrow' | 'arrow2' |
    'arrow3' | 'bouncingBar' | 'bouncingBall' |
    'smiley' | 'monkey' | 'hearts' |
    'clock' | 'earth' | 'moon' |
    'runner' | 'pong'

export const spinners: { [k in key]: { frames: [string] } } = require('cli-ux/lib/action/spinners')
