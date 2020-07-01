/**
 * This file contains core Specifications for simulator objects
 */

import { Vector2d, Vector3d } from "../SimTypes";

// As we define more game object types, add their specs to this union
export type SimObjectSpec =
  | IBallSpec
  | IBoxSpec
  | IWallSpec
  | IPyramidSpec
  | IConeSpec
  | ICylinderSpec
  | IPerimeterSpec;

export interface IPhysicsProperties {
  linearDamping?: number;
  angularDamping?: number;
  density?: number;
  friction?: number;
  restitution?: number;
}

/**
 * Base object spec
 *
 * This interface is used to specify the basics of any SimObject
 * Most properties are optional except for `type`, which will be
 * defined by each subclassing spec
 */
export interface IBaseSimObjectSpec {
  type: string;
  isStatic?: boolean;
  initialPosition?: Vector2d;
  physicsProperties?: IPhysicsProperties;
  baseColor?: number;
}

/**
 * Spec for a Simple Ball/Sphere
 */
export interface IBallSpec extends IBaseSimObjectSpec {
  type: "ball";
  radius: number;
}

/**
 * Spec for a Simple Box
 */
export interface IBoxSpec extends IBaseSimObjectSpec {
  type: "box";
  dimensions: Vector3d;
}

/**
 * Spec for a Simple Cone
 */
export interface IConeSpec extends IBaseSimObjectSpec {
  type: "cone";
  radius: number;
  height: number;
}

/**
 * Spec for a Simple Cylinder
 */
export interface IPyramidSpec extends IBaseSimObjectSpec {
  type: "pyramid";
  baseDimensions: Vector2d;
  height: number;
}

/**
 * Spec for a Simple Cone
 */
export interface ICylinderSpec extends IBaseSimObjectSpec {
  type: "cylinder";
  radius: number;
  height: number;
}

/**
 * Spec for a Wall
 */
export interface IWallSpec extends IBaseSimObjectSpec {
  type: "wall";
  start: Vector2d;
  end: Vector2d;
  thickness?: number;
  height?: number;
}

/**
 * Spec for a Perimeter
 */
export interface IPerimeterSpec {
  type: "perimeter";
  thickness: number;
  height: number;
}

// Custom Meshes
export interface ICustomMeshSpec {
  filePath: string;
  translation?: Vector3d;
  rotation?: Vector3d;
  scale?: Vector3d;
}
