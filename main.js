$(document).ready(() => {
    let arrayForObject = [];
    let toDoText = $('#newToDoText');
    let counter = 0;

    mainHandler();

    function mainHandler() {
        let button = $('#btnAddToDo');
        button.on('click', e => {
            e.preventDefault();
            setItemToLocalStorage();

            localStorage.setItem('to_do', JSON.stringify(arrayForObject));
            let objectsArray = JSON.parse(localStorage.getItem('to_do'));

            createToDoItem(objectsArray);
            moveTo(objectsArray);
            removeELem(objectsArray);
        });
    }

    drawItemFromLocalStorage();

    function setItemToLocalStorage() {
        counter++;
        let toDoObject = {
            id: 0,
            text: '',
            status: 0,
            btnText: ''
        };
        toDoObject.id = counter;
        toDoObject.text = toDoText.val();
        toDoObject.status = 1;
        toDoObject.btnText = 'In Progress >';
        arrayForObject.push(toDoObject);
    }

    function createToDoItem(objectsArray) {
        let toDoInner = $('.to_do_inner');
        for (let i = 0; i < objectsArray.length; i++) {
            if (i === objectsArray.length - 1) {
                let item = $(`
                    <div class="to_do">
                        <p>${objectsArray[i].text}</p>
                        <span class="remove" id="removeBtnId${counter}"> x </span>
                        <button type="button" id="transition_btn${counter}" class="btn">${objectsArray[i].btnText}</button>
                    </div>
                `);
                toDoInner.append(item);
            }
        }
    }

    function moveTo(objectsArray) {
        for (let i = 0; i < objectsArray.length; i++) {
            let btnId = i + 1;
            $(document).on('click', '#transition_btn' + btnId, e => {
                if (objectsArray[i].status === 1) {

                    $(e.target).text('Done >');
                    let item = $(e.target).parent();
                    $('.in_progress_inner').append(item[0]);
                    objectsArray[i].status = 2;
                    objectsArray[i].btnText = 'Done >';
                    arrayForObject = objectsArray;
                    localStorage.setItem('to_do', JSON.stringify(arrayForObject));

                } else if (objectsArray[i].status === 2) {

                    $(e.target).text('Delete >');
                    let item = $(e.target).parent();
                    $('.done_inner').append(item[0]);
                    objectsArray[i].status = 3;
                    objectsArray[i].btnText = 'Delete >';
                    arrayForObject = objectsArray;
                    localStorage.setItem('to_do', JSON.stringify(arrayForObject));

                }
            });
        }
    }

    function removeELem(objectsArray) {
        for (let i = 0; i < objectsArray.length; i++) {
            let removeBtnId = i + 1;
            $(document).on('click', '#removeBtnId' + removeBtnId, e => {
                $(e.target).parent().remove();
                let idIndex = parseInt($(e.target).attr('id').substr(-1, 1));
                objectsArray.splice(objectsArray.findIndex(elem => elem.id === idIndex), 1);
                arrayForObject = objectsArray;
                localStorage.setItem('to_do', JSON.stringify(arrayForObject));
            });
        }
    }

    function drawItemFromLocalStorage() {
        let objectsArray = JSON.parse(localStorage.getItem('to_do'));
        for (let i = 0; i < objectsArray.length; i++) {
            if (objectsArray[i].status === 1) {
                let toDoInner = $('.to_do_inner');
                let item = $(`
                        <div class="to_do">
                            <p>${objectsArray[i].text}</p>
                            <span class="remove" id="removeBtnId${objectsArray[i].id}"> x </span>
                            <button type="button" id="transition_btn${objectsArray[i].id}" class="btn">${objectsArray[i].btnText}</button>
                        </div>
                    `);
                toDoInner.append(item);
            }
            if (objectsArray[i].status === 2) {
                let toDoInner = $('.in_progress_inner');
                let item = $(`
                        <div class="to_do">
                            <p>${objectsArray[i].text}</p>
                            <span class="remove" id="removeBtnId${objectsArray[i].id}"> x </span>
                            <button type="button" id="transition_btn${objectsArray[i].id}" class="btn">${objectsArray[i].btnText}</button>
                        </div>
                    `);
                toDoInner.append(item);
            }
            if (objectsArray[i].status === 3) {
                let toDoInner = $('.done_inner');
                let item = $(`
                        <div class="to_do">
                            <p>${objectsArray[i].text}</p>
                            <span class="remove" id="removeBtnId${objectsArray[i].id}"> x </span>
                            <button type="button" id="transition_btn${objectsArray[i].id}" class="btn">${objectsArray[i].btnText}</button>
                        </div>
                    `);
                toDoInner.append(item);
            }
        }
    }

});

