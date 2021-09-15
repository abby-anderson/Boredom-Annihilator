let init = () => {
    console.log('bored? here are some ideas:');
    //fetch the completed tasks and render them to the page
    //fetch the saved lists of tasks and render them to the page
}

const BASE_URL = "http://localhost:3000/saved-activities";
const activity_url = "https://www.boredapi.com/api/activity";

const container = document.querySelector('#activity-container');
const listContainer = document.querySelector('#list-container');
const listName = document.querySelector('#list-name')
const randomButton = document.querySelector('#random-button');
const formSave = document.querySelector('form-save');
const formList = document.querySelector('#selected-activities');
const activityDropDown = document.querySelector('#activity-dropdown')
const activityListByType = document.querySelector('#activities-by-type-container')
const completedList = document.querySelector('#completed-list');
//still need to create and grab ul element for completed lists, and define it here!
//same with saved lists

//called on click event when the save button on a list item is clicked
//applied to save button inside render function
//saveButton.addEventListener('click', selectActivity);
let selectActivity = (event) => {
    //this function is to actually handle the selection of activities so that they can be saved on submit
    const selectedActivity = event.target.parentNode;
    selectedActivity.className = 'selected-list-element';
    console.log(event.target.parentNode);
    formList.append(selectedActivity);


}


//called on submit event when the name of a list is saved
//by listName.addEventListener('submit', saveActivity);
let saveActivity = (event) => {
    //this function saves specific selected activities to a local db list
    event.preventDefault();
    
    const newListName = document.querySelector("input#list-name-input").value;
    console.log(newListName); //for name of newListSavedObj

    //now, how to grab the list elements that are now in the form. maybe something about children with class = selected-list-element
    let listNodes = document.querySelectorAll('.selected-list-element');
    const listArray = [...listNodes]
    const newListArray = [];

    listArray.forEach(element => {
        console.log(element.lastChild.textContent);
        const newActivity = element.lastChild.textContent;
        //for activities saved to newListSavedObj
        console.log(newActivity);
        newListArray.push(newActivity);
        console.log(newListArray);
        return newListArray;
    });

    // creating a new object to save to the local db
    const newListSavedObj = {
        name: newListName, 
        activities: newListArray,//selected list element
        //id: , //automatically assigned?
    }

    console.log(newListSavedObj);

    //then do fetch request to post this to the local db
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newListSavedObj),
    };

    fetch(BASE_URL, configObj)
    .then(response => response.json())
    .then(data => console.log(data));
    listName.reset();
    
    //once the spot is created, will want to add the title to a section where you can see all your saved list titles. that way you can click on them and see the activity items

}

let deleteActivity = (event) => {
    //this funtion deletes activities off of a list
    console.log(event);
    console.log(event.target.parentNode);
    event.target.parentNode.remove();
    
    //would like to also add a section of this regarding DELETE fetch, so that we can delete items that were saved to a local db list --maybe would be in a separate function just for separation of concerns
}

let callSavedActivity = () => {
    //this function lets you click on the title/heading/whatever of a saved list and see the items on the list
    //which means we'll need to add a click event on the title/button once it's created! 
    
    //this would likely be a get request to the local db, and would show them on the page


    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => console.log(data));
//instead of console.log(data), could render just the title of the saved activity, OR the title, and list elements, and done and delete buttons (you wouldn't want to render the save button since these activities are already saved!)

    
}


//already added click event to done button inside the render fxn, click event will call complete activity
//doneButton.addEventListener('click', completeActivity);
let completeActivity = (event) => {
    //this function will be called when you click on the done button, and it will both move the list item on the dom to the completed activities div, and it will save the list item to a list of completed activities on the local db
    console.log(event)
    const completedActivity = event.target.parentNode;
    completedActivity.className = 'completed-list-element';
    console.log(completedActivity);
    completedList.append(completedActivity);
    //****IMPORTANT - still need to create div, ul element containtainer for these li, then grab the ul element and name it completedList

    //selecting the activity within completedActivity 
    const completedActivityValue = completedActivity.lastChild.innerText

    //making new obj for post request
    const newListCompletedObj = {
        activity: completedActivityValue
    }
    console.log(newListCompletedObj)

    //fetch request to POST to local db
    const configCompletedObj = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(newListCompletedObj)
    };
    
    fetch(BASE_URL, configCompletedObj)
    .then(response => response.json())
    .then(data => data);

} //////ITS ADDING TO THE END OF SAVED ACTIVITIES NOT COMPLETED
///should we have 2 db one for saved one for completed?



let renderActivity = (data) => {
    const newActivity = data;
    console.log(newActivity);
    
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    newSpan.textContent = newActivity;
    newLi.className = 'new-list-element';
    newLi.appendChild(newSpan);
    listContainer.appendChild(newLi);
    
    const saveButton = document.createElement('button');
    saveButton.textContent = "save ♥";
    saveButton.className = 'btn btn-primary pushingtotheside'; 
    newLi.prepend(saveButton);
    saveButton.addEventListener('click', selectActivity);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete 🗑️';
    deleteButton.className = 'delete-button pushingtotheside';
    deleteButton.className = 'btn btn-danger';
    newLi.prepend(deleteButton);
    deleteButton.addEventListener('click', deleteActivity);
    
    const doneButton = document.createElement('button');
    doneButton.textContent = 'done ✅';
    doneButton.className = 'done-button';
    doneButton.className = 'btn btn-success pushingtotheside';
    newLi.prepend(doneButton);
    doneButton.addEventListener('click', (event) => {
        event.preventDefault()
        completeActivity() 
        party.confetti(event, {
            shapes: ["star"],
            gravity: 75
        })
        // party.sparkles(event)
    });
    function reset(){
        activityDropDown.selectedIndex = 0;
    }
    reset()

}

let fetchData = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => renderActivity(data.activity))
}

let activityFactory = (event) => {
    event.preventDefault;
    fetchData(activity_url);   
}


listName.addEventListener('submit', saveActivity);
// ***.addEventListener('submit', saveCompletedActivity)
randomButton.addEventListener('click', activityFactory);
document.addEventListener('DOMContentLoaded', init);



////////dropdown



let renderType = (type) => {
    
    let typeLi = document.createElement('li')
    typeLi.id = "type-li"
    typeLi.innerText = type
    activityListByType.append(typeLi)
    ///what do we want to do with this? add it to its own container or add it to eh existing list?
    function reset(){
        activityDropDown.selectedIndex = 0;
    }
    reset()
}


// renderActivity = () => {
//     // let typeLi = document.createElement('li')
//     // typeLi.id = "type-li"
//     // typeLi.innerText = type
//     // activityListByType.append(typeLi)
//     ///what do we want to do with this? add it to its own container or add it to eh existing list?
    // function reset(){
    //     activityDropDown.selectedIndex = 0;
    // }
    // reset()
// }

// let type_Url = 'http://www.boredapi.com/api/activity?type='

let fetchForDropdown = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(type => renderActivity(type.activity))
}


let handleChangeFactory = (event) => {

    let type_Url = 'http://www.boredapi.com/api/activity?type='

    let activityType = event.target.value

        if (activityType === 'education') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'recreation') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'socail') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'diy') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'charity') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'cooking') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'relaxation') {
        fetchForDropdown(type_Url + `${activityType}`)
    
        } else if (activityType === 'music') {
        fetchForDropdown(type_Url + `${activityType}`)

        } else if (activityType === 'busywork') {
        fetchForDropdown(type_Url + `${activityType}`)
        }




}


activityDropDown.addEventListener('change', handleChangeFactory)




/////////



//deliverables to aim for:
//randomize button, click event DONE QUICKANDIRTY
//add to a list DONE QUICKANDIRTY

//NEW - need to save these lists to a local db, maybe allow the user to give each list a name with a submit form
//then the user can choose which list they want to look at, and while looking at the list they can delete items if they want to

//another stretch goal possibly, allow the user to save activity ideas that they love to a local db, and then they can randomly select from their pile there too

//choose from a drop down menu of types if you have an idea of what you might be interested in

document.addEventListener('DOMContentLoaded', init);
