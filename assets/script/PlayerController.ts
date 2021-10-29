
import { _decorator, Component, Node, systemEvent, SystemEvent, SystemEventType, EventMouse, Vec3, 
    TiledUserNodeData, Animation, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property ({
        type:Animation
    })
    cocosAnim : Animation| null = null;


    private _startJump = false;
    private _jumpStep = 0;
    private _curJumpTime= 0;
    private _jumpTime = 0.3;
    private _curJumpSpeed= 0;
    private _curPos = new Vec3();
    private _targetPost = new Vec3();
    private _deltaPos = new Vec3();
    private _isMoving = false;

    jumpByStep(step:number){
        if(this._isMoving){
            return;
        }
        this._isMoving = true;
        this._startJump = true;
        this._jumpStep = step;
        this._curJumpSpeed = step / this._jumpTime;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPost , this._curPos , new Vec3(step , 0 , 0));
        if(this.cocosAnim){
            console.log("jump");
            this.cocosAnim.getState('cocos_anim_jump').speed  = 3.5;
            this.cocosAnim.play('cocos_anim_jump');
        }else{
            console.log("no?");
        }
    }

    start () {
        // [3]
        systemEvent.on(SystemEventType.MOUSE_UP , this.onMouseUp , this);
    }
    onOnceJumpEnd(){
        this._isMoving = false;
        if(this.cocosAnim){
            console.log("idle");
            this.cocosAnim.play('cocos_anim_idle');
        }
    }
    onMouseUp( event:EventMouse){
        if(event.getButton() === 0){
            this.jumpByStep(1);
        }else if(event.getButton() === 2){
            this.jumpByStep(2);
        }
    }
    update (deltaTime: number) {
        // [4]
        if(this._startJump){
            this._curJumpTime += deltaTime;
            if(this._curJumpTime > this._jumpTime){
                this.node.setPosition(this._targetPost);
                this._startJump=false;
                this._curJumpTime= 0;
                this.onOnceJumpEnd();
            }else{
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos,  this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
