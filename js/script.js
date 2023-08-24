document.addEventListener('DOMContentLoaded', () => {
    const localSavedBlocks = [];
    // Navigation

    const navBlocks = document.querySelectorAll('.header__bottom-block__tasks');
    const tabs = document.querySelectorAll('.main-block__lists');
    const tabsArr = [...tabs];

    function tabsSwitcher(switchers, tabsToSwitch) {
        switchers.forEach((toggle, i) => {
            toggle.addEventListener('click', e => {
                switchers.forEach(item => {
                    item.classList.remove('header__bottom-block__tasks_active');
                });
                toggle.classList.add('header__bottom-block__tasks_active');
                tabsToSwitch.forEach(tab => {
                    tab.classList.remove('main-block__lists_active');
                });
                tabsToSwitch[i].classList.add('main-block__lists_active');
            });
        });
    }

    tabsSwitcher(navBlocks, tabsArr);

    //Task adder

    const taskAddBtn = document.querySelector('.add-task__btn');
    const taskListToDo = document.querySelector('.main-block__lists__tasks');
    let counter;
    counter = localStorage.length;

    function noEnterKey(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    function syncronizer(event) {
        if(event.target.parentElement.querySelector('.star').style.color == 'rgb(209, 209, 72)') {
            if(event.target.parentElement.parentElement.classList.contains('main-block__lists-to-do__tasks')) {
                const savedTasks = savedList.querySelectorAll('[data-number]');
                savedTasks.forEach(item => {
                    if (event.target.parentElement.dataset.number == item.dataset.number) {
                        item.querySelector('.main-block__lists__tasks__item__title').textContent = event.target.parentElement.querySelector('.main-block__lists__tasks__item__title').textContent;
                        item.querySelector('.main-block__lists__tasks__item__description').textContent = event.target.parentElement.querySelector('.main-block__lists__tasks__item__description').textContent;
                    
                        localSavedBlocks[event.target.parentElement.getAttribute('data-number')] = event.target.parentElement.innerHTML;
                        localStorage.setItem(event.target.parentElement.getAttribute('data-number'), localSavedBlocks[event.target.parentElement.getAttribute('data-number')]);
                    }
                });
            } else if (event.target.parentElement.parentElement.classList.contains('main-block__lists-saved__tasks')) {
                const savedTasks = taskListToDo.querySelectorAll('[data-number]');
                savedTasks.forEach(item => {
                    if (event.target.parentElement.dataset.number == item.dataset.number) {
                        item.querySelector('.main-block__lists__tasks__item__title').textContent = event.target.parentElement.querySelector('.main-block__lists__tasks__item__title').textContent;
                        item.querySelector('.main-block__lists__tasks__item__description').textContent = event.target.parentElement.querySelector('.main-block__lists__tasks__item__description').textContent;
                    
                        localSavedBlocks[event.target.parentElement.getAttribute('data-number')] = event.target.parentElement.innerHTML;
                        localStorage.setItem(event.target.parentElement.getAttribute('data-number'), localSavedBlocks[event.target.parentElement.getAttribute('data-number')]);
                    }
                });
            }
        }
    }

    function taskCreater() {
        const taskExample = `
            <div class="main-block__lists__tasks__item__title" contenteditable = 'true'>New Task</div>
            <div class="main-block__lists__tasks__item__description" contenteditable = 'true'>Task description</div>
            <span class="star" style="color: rgb(124, 123, 123);">&#9733;</span>
            <span class="waste-basket" style="color: rgb(124, 123, 123);">&#128465;</span>
            <span class="restore" style="color: rgb(124, 123, 123);">&#8634;</span>
            <span class="status" style="display: none;" data-saved="false" data-bin="false"></span>
         `;
        const taskExampleContainer = document.createElement('div');
        taskExampleContainer.classList.add('main-block__lists__tasks__item');
        taskExampleContainer.innerHTML = taskExample;

        taskExampleContainer.addEventListener('keydown', noEnterKey);

        return taskExampleContainer
    }
    
    

    function taskAdder(parrentElement, addBtn) {
        addBtn.addEventListener('click', () => {
            const newTask = taskCreater();
            counter++;
            newTask.setAttribute('data-number', counter)
            newTask.setAttribute('data-saved', false);
            newTask.setAttribute('data-bin', false);
            parrentElement.prepend(newTask);
            addFavorite(newTask.querySelector('.star'));
            deleteTask(newTask.querySelector('.waste-basket'))
            newTask.addEventListener('input', syncronizer);
            
            // localSavedBlocks[counter] = newTask.innerHTML;
            // localStorage.setItem(counter, localSavedBlocks[counter]);
        });
    }

    taskAdder(taskListToDo, taskAddBtn);


    // Favorit

    const savedList = document.querySelector('.main-block__lists-saved__tasks');

    function removeFavorit(event, originalElement) {
        const savedTasks = savedList.querySelectorAll('[data-number]');
        savedTasks.forEach(item => {
            if (event.target.parentElement.dataset.number == item.dataset.number) {
                originalElement.style.color = 'rgb(124, 123, 123)';
                originalElement.nextElementSibling.style.display = 'block';
                item.remove();
                
            }
        });
    }

    function addFavorite(toggleItem) {
        toggleItem.addEventListener('click', (event) => {
            if (toggleItem.style.color == 'rgb(124, 123, 123)') {
                toggleItem.style.color = '#d1d148'
                toggleItem.nextElementSibling.style.display = 'none';
                
                const taskCopy = event.target.parentElement.cloneNode(true);
                savedList.append(taskCopy);
                taskCopy.addEventListener('keydown', noEnterKey);
                taskCopy.addEventListener('input', syncronizer);
                // toggleItem.parentElement.querySelector('.status').setAttribute('data-saved', true);
                // localSavedBlocks[toggleItem.parentElement.getAttribute('data-number')] = toggleItem.parentElement.innerHTML;
                // localStorage.setItem(toggleItem.parentElement.getAttribute('data-number'), localSavedBlocks[toggleItem.parentElement.getAttribute('data-number')]);



                
                const starCopy = taskCopy.querySelector('.star');
                addFavorite(starCopy);
                
                
                return originalStar = toggleItem;

            } else {
                toggleItem.style.color = 'rgb(124, 123, 123)';
                toggleItem.nextElementSibling.style.display = 'block';
                // toggleItem.parentElement.querySelector('.status').setAttribute('data-saved', false);
                // localSavedBlocks[toggleItem.parentElement.getAttribute('data-number')] = toggleItem.parentElement.innerHTML;
                // localStorage.setItem(toggleItem.parentElement.getAttribute('data-number'), localSavedBlocks[toggleItem.parentElement.getAttribute('data-number')]);


                removeFavorit(event, originalStar);
            }
        });
    }


    // Bin

    const binList = document.querySelector('.main-block__lists-bin__tasks');
    const wasteBasket = document.querySelector('.waste-basket');

    function moveToBin(event) {
        binList.append(event.target.parentElement);
        event.target.previousElementSibling.style.display = 'none';
        event.target.previousElementSibling.style.color = 'rgb(124, 123, 123)';
        event.target.nextElementSibling.style.display = 'block';

        // removeFavorit(event);


        event.target.removeEventListener('click', moveToBin);
        event.target.addEventListener('click', deletePermanently);
        event.target.nextElementSibling.addEventListener('click', unDo);

        // event.target.parentElement.querySelector('.status').setAttribute('data-bin', true);
        // localSavedBlocks[event.target.parentElement.getAttribute('data-number')] = event.target.parentElement.innerHTML;
        // localStorage.setItem(event.target.parentElement.getAttribute('data-number'), localSavedBlocks[event.target.parentElement.getAttribute('data-number')]);
        
    }

    function unDo(event) {
        taskListToDo.prepend(event.target.parentElement);
        event.target.style.display = 'none';
        event.target.previousElementSibling.previousElementSibling.style.display = 'block';
        event.target.removeEventListener('click', unDo);
        event.target.previousElementSibling.removeEventListener('click', deletePermanently);
        event.target.previousElementSibling.addEventListener('click', moveToBin);

        // event.target.parentElement.querySelector('.status').setAttribute('data-bin', false);
        // localSavedBlocks[event.target.parentElement.getAttribute('data-number')] = event.target.parentElement.innerHTML;
        // localStorage.setItem(event.target.parentElement.getAttribute('data-number'), localSavedBlocks[event.target.parentElement.getAttribute('data-number')]);

    }

    function deletePermanently (event) {
        const confirmation = window.confirm('Удалить безвозвратно?');
        if(confirmation) {
            event.target.parentElement.remove();

            // localStorage.removeItem(event.target.parentElement.getAttribute('data-number'));
        }
    }


    function deleteTask(toggleItem) {
        toggleItem.addEventListener('click', moveToBin);
    }

    //Local Storage

    // for (const key in localStorage) {
    //     if (localStorage.hasOwnProperty(key)) {
    //         const value = localStorage.getItem(key);
    //         const addedBlock = document.createElement('div');
    //         addedBlock.classList.add('main-block__lists__tasks__item');
    //         addedBlock.setAttribute('data-number', key);
    //         addedBlock.innerHTML = value
            

    //         if(addedBlock.querySelector('.status').getAttribute('data-saved') == 'false') {
    //             if(addedBlock.querySelector('.status').getAttribute('data-bin') == 'false') {
    //                 addFavorite(addedBlock.querySelector('.star'));
    //                 deleteTask(addedBlock.querySelector('.waste-basket'));
    //                 addedBlock.addEventListener('input', syncronizer);

    //                 taskListToDo.prepend(addedBlock);
    //             } else if(addedBlock.querySelector('.status').getAttribute('data-bin') == 'true') {
    //                 addedBlock.querySelector('.waste-basket').addEventListener('click', deletePermanently);
    //                 addedBlock.querySelector('.restore').addEventListener('click', unDo);
    //                 addFavorite(addedBlock.querySelector('.star'));
    //                 // deleteTask(addedBlock.querySelector('.waste-basket'));
    //                 binList.append(addedBlock);
    //             }
    //         } else if(addedBlock.querySelector('.status').getAttribute('data-saved') == 'true') {
    //             addFavorite(addedBlock.querySelector('.star'));
    //             deleteTask(addedBlock.querySelector('.waste-basket'));
    //             taskListToDo.prepend(addedBlock);
    //             const taskCopy = addedBlock.cloneNode(true);
    //             savedList.append(taskCopy);
    //             taskCopy.addEventListener('keydown', noEnterKey);
    //             taskCopy.addEventListener('input', syncronizer);

    //             const starCopy = taskCopy.querySelector('.star');
    //             addFavorite(starCopy);
    //         }

    //     }
    // }

});