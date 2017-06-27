import Animation from './animation.cls';
import Transition from './transition.cls';
import teOnce from './te-once.fnc';
export default class ATools{//animation tools;
    static get Animation(){
        return Animation;
    }
    static get Transition(){
        return Transition;
    }
    static get teOnce(){
        return teOnce;
    }
}