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
            this.config.state = state;
        }else {
            throw new Error('state isn\'t exist');
        }

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
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

    }

    /**
     * Clears transition history
     */
    clearHistory() {

    }
}

// module.exports = FSM;
const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};


const student = new FSM(config);



student.trigger('study');

 student.trigger('eat');
student.trigger('get_up');

let cccc= 'hjhkljh';
/** @Created by Uladzimir Halushka **/
