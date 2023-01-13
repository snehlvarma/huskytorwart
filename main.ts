let xneu = 0
let yneu = 0
let xalt = 0
let yalt = 0
/**
 * Huskylens 320x240
 * 
 * LED-Matrix 5x5
 */
/**
 * Links LEDReihe 0,1e LEDReihe 2
 * 
 * Rechts LEDRei 3,4
 */
basic.forever(function () {
    huskylens.initI2c()
    huskylens.initMode(protocolAlgorithm.ALGORITHM_OBJECT_RECOGNITION)
    huskylens.writeName(1, "\"bus")
    pins.digitalWritePin(DigitalPin.C5, 0)
    basic.showLeds(`
        . . # . .
        . . . . .
        # . . . .
        . . . . .
        . . . . #
        `)
    basic.pause(2000)
    pins.digitalWritePin(DigitalPin.C5, 1)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(2000)
    pins.digitalWritePin(DigitalPin.C4, 0)
    basic.showLeds(`
        # . . . .
        . . . . .
        . . . . #
        . . . . .
        . . # . .
        `)
    basic.pause(2000)
    pins.digitalWritePin(DigitalPin.C4, 1)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    huskylens.request()
    if (huskylens.isLearned(1)) {
        xneu = huskylens.readeBox(1, Content1.xCenter)
        yneu = huskylens.readeBox(1, Content1.yCenter)
        if (xneu > 0) {
            xneu = pins.map(
            xneu,
            0,
            320,
            0,
            5
            )
            yneu = pins.map(
            yneu,
            0,
            240,
            0,
            5
            )
            led.unplot(xalt, yalt)
            led.plot(xneu, yneu)
            xalt = xneu
            yalt = yneu
            if (xneu < 2) {
                pins.digitalWritePin(DigitalPin.C4, 1)
            } else if (xneu > 2) {
                pins.digitalWritePin(DigitalPin.C5, 1)
            }
        } else {
            led.unplot(xalt, yalt)
        }
    }
})
