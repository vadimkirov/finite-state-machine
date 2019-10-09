class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */



    constructor(config) {
        if (config == null) {
            throw new Error('config isn\'t passed');
        } else {
            this.config = config;
        }
        this.config.state = this.config.initial;
        this.undoStack = [];
        this.redoStack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.config.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if(state in  this.config.states){

            if(this.undoStack.length === 0 && state !== this.config.initial.toString()){

                this.undoStack.push(this.getState().toString());
            }
            this.config.state = state;
            this.undoStack.push(this.config.state);
        }else {
            throw new Error('state isn\'t exist');
        }


        // if(state in  this.config.states){
        //
        //     if(this.undoStack.length === 0 && state !== this.config.initial.toString()){
        //
        //         this.undoStack.push(this.getState().toString());
        //     }
        //     this.config.state = state;
        //     this.undoStack.push(this.config.state);
        // }else {
        //     throw new Error('state isn\'t exist');
        // }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const checkStates = this.config.states;
        let checkEvent = true;
        let checkCurrentState = this.getState().toString();

        let newState = checkStates[checkCurrentState].transitions;

        if ((event in newState) && checkEvent) for (let key in newState) {

            if (event !== key) {
                continue;
            }
             this.changeState(newState[key]);
           // this.undoStack.push(this.changeState(newState[key]));
            checkEvent = false;
        }

        if(checkEvent) {
            throw new Error('event in current state isn\'t exist');
        }


    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.config.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let allStates = false;
        let checkStates;
        checkStates = this.config.states;

        let results = [];
        if(event === undefined){
            allStates = true;
        }

        for(let keyState in checkStates){
            let keyStateToString = keyState.toString();
            if(allStates) {
                results.push(keyStateToString);

            }else {
                if ((event in checkStates[keyStateToString].transitions)) for (let key in checkStates[keyStateToString].transitions) {

                    if (event !== key) {
                        continue;
                    }
                    results.push(keyStateToString);

                }
            }
        }

        return results;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.undoStack.length === 0){
            return false;
        }else {

            this.redoStack.push(this.undoStack.pop());

            if(this.undoStack.length === 0){
                return false;
            }


            this.changeState(this.undoStack.pop());

            return true;
        }

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.redoStack.length === 0){
            return false;
        }else {

            if(this.getState().toString() === this.redoStack[this.redoStack.length -1]){
                return false;
            }
            let redoState = this.redoStack.pop();
            this.undoStack.push(redoState);
            this.changeState(redoState);
            return true;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.redoStack.length = 0;
        this.undoStack.length = 0;
    }
}

module.exports = FSM;
// const config = {
//     initial: 'normal',
//     states: {
//         normal: {
//             transitions: {
//                 study: 'busy',
//             }
//         },
//         busy: {
//             transitions: {
//                 get_tired: 'sleeping',
//                 get_hungry: 'hungry',
//             }
//         },
//         hungry: {
//             transitions: {
//                 eat: 'normal'
//             },
//         },
//         sleeping: {
//             transitions: {
//                 get_hungry: 'hungry',
//                 get_up: 'normal',
//             },
//         },
//     }
// };
//
//
// const student = new FSM(config);
//
//
// student.changeState('hungry');
// student.undo();
// student.changeState('normal');
// student.undo();
// student.changeState('busy');
// student.redo();
// let testing = student.redo();
//
//
// let cccc= 'hjhkljh';
/** @Created by Uladzimir Halushka **/
