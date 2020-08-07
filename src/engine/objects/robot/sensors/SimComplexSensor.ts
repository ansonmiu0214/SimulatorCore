import {
  IComplexSensorValue,
  IComplexSensorSpec,
} from "../../../specs/RobotSpecs";
import { SimObject } from "../../SimObject";
import { BodyDef, FixtureDef } from "planck-js";
import { EventRegistry } from "../../../EventRegistry";

/**
 * Abstract base class representing a ComplexSensor
 *
 * A ComplexSensor represents a physical sensor that provides feedback
 * either via a digital channel (HIGH/LOW) or an analog channel (voltage)
 */
export abstract class SimComplexSensor extends SimObject {
  protected _channel: number;
  protected _sensorType: string;

  protected _value: IComplexSensorValue;

  protected _bodySpecs: BodyDef;
  protected _fixtureSpecs: FixtureDef;

  /**
   * GUID of the robot that this sensor is attached to
   */
  protected _robotGuid: string;

  constructor(type: string, robotGuid: string, spec: IComplexSensorSpec) {
    super("ComplexSensor-" + type);
    this._channel = spec.channel;
    this._sensorType = type;
    this._value = { value: {} };
    this._robotGuid = robotGuid;
  }

  /**
   * Sensor specific type identifier
   */
  get sensorType(): string {
    return this._sensorType;
  }

  /**
   * Channel number of this sensor
   */
  get channel(): number {
    return this._channel;
  }

  /**
   * Robot-specific sensor identifier
   */
  get identifier(): string {
    return `${this._sensorType}-${this._channel}`;
  }

  /**
   * Current "public" value of this sensor
   *
   * This value represents what a physical sensor would send to its
   * controller. E.g. a distance sensor will convert the distance it
   * gets via the {@link onSensorEvent} callback into a voltage, and
   * return it here.
   *
   * In the base case, we just return an empty object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get value(): any {
    return this._value.value;
  }

  /**
   * Update the value of this sensor
   *
   * Usually called via the {@link onSensorEvent} callback
   * @protected
   * @param val
   */
  protected setValue(val: IComplexSensorValue): void {
    this._value = val;
  }

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
  }

  /**
   * Callback triggered whenever a sensor event happens
   * @param val
   */
  abstract onSensorEvent(val: IComplexSensorValue): void;

  /**
   * Register this sensor with the simulator wide {@link EventRegistry}
   * @param robotGuid
   * @param eventRegistry
   */
  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    eventRegistry.registerComplexSensor(robotGuid, this);
  }
}
