/**
 * Implement a type for all app states.
 *
 * @description This has has the following states:
 *  - `connectionSetup`: A connection is not established. Scan and connect to a device.
 *  - `sensorSetup`: Calibrate the sensor to before displaying measurements. This essentially tares the sensor.
 *  - `training`: After setup the device can be used for training. Here we display sensor data.
 */
export type TAppState = "connectionSetup" | "sensorSetup" | "training";