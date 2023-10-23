
document.addEventListener("DOMContentLoaded", function () {
    function saveData() {
        const checkboxes = document.querySelectorAll('#table_for_checkboxes input[type="checkbox"]');
        const chooseYInput = document.getElementById('choose_y');
        // const chooseRInputs = document.querySelectorAll('input[name="option"]');

        const checkboxValues = Array.from(checkboxes).map(checkbox => ({
            value: checkbox.value,
            checked: checkbox.checked
        }));

        const chooseY = chooseYInput.value;

        // let chooseR;
        // for (const input of chooseRInputs) {
        //     if (input.checked) {
        //         chooseR = input.value;
        //         break;
        //     }
        // }

        localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));
        localStorage.setItem('chooseY', chooseY);
        // localStorage.setItem('chooseR', chooseR);
    }


    function loadSavedData() {
        const checkboxes = document.querySelectorAll('#table_for_checkboxes input[type="checkbox"]');
        const chooseYInput = document.getElementById('choose_y');
        const chooseRInputs = document.querySelectorAll('input[name="option"]');

        const savedCheckboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || [];

        for (const checkbox of checkboxes) {
            const savedValue = savedCheckboxValues.find(savedCheckbox => savedCheckbox.value === checkbox.value);
            if (savedValue) {
                checkbox.checked = savedValue.checked;
            }
        }


        const savedChooseY = localStorage.getItem('chooseY');
        chooseYInput.value = savedChooseY || '';

        // const savedChooseR = localStorage.getItem('chooseR');
        // for (const input of chooseRInputs) {
        //     if (input.value === savedChooseR) {
        //         input.checked = true;
        //     }
        // }
    }


    document.querySelectorAll('#table_for_checkboxes input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveData);
    });

    document.getElementById('choose_y').addEventListener('input', saveData);

    // document.querySelectorAll('input[name="option"]').forEach(input => {
    //     input.addEventListener('change', saveData);
    // });


    window.addEventListener('load', loadSavedData);
})
