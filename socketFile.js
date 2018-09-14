///// Socket stuff in index.js
/////////PRACTICE
let cuteAnimals = [
    {
        name: "hermit crab",
        score: 2
    },

    {
        name: "squirrel",
        score: 1
    },

    {
        name: "whale",
        score: 16
    },

    {
        name: "sloth",
        score: 10
    },

    {
        name: "elephant",
        score: 11
    }
];

//emit sends message to user that has just connected
//pass it event name and data
// if you write an emit you HAVE to listen for it in your socket.js file
socket.emit("cuteAnimals", cuteAnimals);

////Socket stuff in socket.js

//listenes to emit from server
// pass it event name to listen to from server and a callback function
//after data has been recieved, we will put it into redux
socket.on("cuteAnimals", data => {
    console.log("DATA THAT I GOT BACK FROM THE SERVER", data);
    store.dispatch(addAnimals(data));
});

// Redux Handling socket data in action.js
export function addAnimals(dataFromDispatch) {
    //return object with type and
    return {
        type: "ADD_ANIMALS",
        animals: dataFromDispatch
    };
}

//Redux handling socket stuff in reducers.js
if (action.type == "ADD_ANIMALS") {
    //coopy the state, modify the state, here we add a new property which is called cuted animals,  the data will be the property of the object that we rerturn from the aciton.js file
    state = {
        ...state,
        cuteAnimals: action.animals
    };
}
