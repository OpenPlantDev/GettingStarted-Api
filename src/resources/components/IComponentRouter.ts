import {Router} from "express";

export interface IComponentRouter {
    Routes: () => Router;
}
