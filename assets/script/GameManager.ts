
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

enum BlockType {
    BT_NONE,
    BT_STONE,
}

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    cruPrefab: Prefab = null!;

    @property
    roadLength = 50;

    private _road: BlockType[] = [];

    generateRoad() {
        this._road.push(BlockType.BT_STONE);
        for (let index = 1; index < this.roadLength; index++) {
            if (this._road[index - 1] == BlockType.BT_NONE) {
                this._road[index] = BlockType.BT_STONE;
            } else {
                this._road.push(Math.floor(Math.random() * 2));
            }
        }
        console.log("generate");
        for (let index = 0; index < this.roadLength; index++) {
            const child = this.spwanBlockByType(this._road[index]);
            if (child) {
                this.node.addChild(child);
                child.setPosition(index, 0, 0);
            }
        }
    }

    spwanBlockByType(type: BlockType) {
        if (!this.cruPrefab) {
            return null;
        }

        let block: Node | null = null;
        switch (type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cruPrefab);
        }
        return block;
    }

    start() {
        // [3]
        this.generateRoad();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
