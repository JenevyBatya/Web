
document.addEventListener("DOMContentLoaded", function () {
    const sharedData = require('./index')
    function saveData() {
        const checkboxes = document.querySelectorAll('#table_for_checkboxes input[type="checkbox"]');
        const chooseYInput = document.getElementById('choose_y');
        // const chooseRInputs = document.querySelectorAll('input[name="option"]');

        const checkboxValues = Array.from(checkboxes).map(checkbox => ({
            value: checkbox.value,
            checked: checkbox.checked
        }));

        const chooseY = chooseYInput.value;

        localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));
        localStorage.setItem('chooseY', chooseY);
    }


    function loadSavedData() {
        const checkboxes = document.querySelectorAll('#table_for_checkboxes input[type="checkbox"]');
        const chooseYInput = document.getElementById('choose_y');

        const savedCheckboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || [];

        for (const checkbox of checkboxes) {
            const savedValue = savedCheckboxValues.find(savedCheckbox => savedCheckbox.value === checkbox.value);
            if (savedValue) {
                checkbox.checked = savedValue.checked;
            }
        }


        const savedChooseY = localStorage.getItem('chooseY');
        chooseYInput.value = savedChooseY || '';

    }


    document.querySelectorAll('#table_for_checkboxes input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveData);
    });

    document.getElementById('choose_y').addEventListener('input', saveData);

    window.addEventListener('load', loadSavedData);
})
