let glNumber = 0;
let search = "";
document.querySelector('.search').value = search;
let glUrl = "http://127.0.0.1:3012";

const viewError = response => {
  if (response.error) {
    
  }
  console.error(response);
}

/* Удалить автомобиль из базы данных */
const deleteAuto = async (id) => {
  const url = `${glUrl}/cars/remove/${id}`;
  const settings = {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }
  try {
    const response = await fetch(url,settings);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  } catch (e) {
    console.log("Ошибка удаления автомобиля из базы данных!");
  }
}
const deleteAutoResp = response => {
  if (response.status) {
    noty('Автомобиль успешно удален!', 'success');
    getListAuto(glNumber, search).then(fillTable).catch(viewError)
  } else {
    noty('Ошибка удаления автомобиля!', 'error');
  }
}

/* Добавить автомобиль в базу данных */
const addAuto = async (number,name) => {
  const url = `${glUrl}/cars/add`;
  const settings = {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      number,
      name,
    }),
  }
  try {
    const response = await fetch(url,settings);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка HTTP: " + response.status);
      const result = await response.json();
      if (result.error) {
        noty(result.error, 'error');
      }
    }
  } catch (e) {
    console.log("Ошибка добавления автомобиля в базу данных!");
  }
}
const addAutoResp = response => {
  if (response['status']) {
    noty('Автомобиль успешно добавлен!', 'success');
    getListAuto(glNumber, search).then(fillTable).catch(viewError)
  } else {
    noty('Ошибка добавления автомобиля в базу!', 'error');
  }
}

/* Получить список всех автомобилей */
const getListAuto = async (offset, number) => {
  const url = `${glUrl}/cars?offset=${offset}&number=${number}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Ошибка HTTP: " + response.status);
    }
  } catch (e) {
    noty('Ошибка получения списка автомобилей от сервера!', 'error');
    console.log("Ошибка получения списка автомобилей от сервера");
  }
}
/* Заполнение таблицы */
const fillTable = response => {
  const { pages, cars } = response;

  const table = document.querySelector('.table tbody');
  const checkbox ='<i class="material-icons delete-auto">delete_forever</i>';
  table.innerHTML = "";
  for (let i of cars) {
    let str = "<tr>";
    str += `<td data-id="${i['_id']}">${checkbox}</td>`;
    str += `<td>${i['number']}</td>`;
    str += `<td>${i['name']}</td>`;
    str += "</tr>";
    table.innerHTML += str;
  }

  // debugger;
  let currentPage = glNumber + 1;
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  if (pages !== undefined) {
    if (pages <= 6) {
      for(let i = 1; i <= pages; i++) {
        if (i != currentPage)
          pagination.innerHTML += `<span class="pagination-link" data-id="${i-1}">${i}</span>\n`;
        else 
          pagination.innerHTML += `<span class="pagination-link main-link" data-id="${i-1}">${i}</span>\n`;
      }
    } else {
      if (currentPage < 4) {
        for(let i = 1; i <= 3; i++) {
          if (i != currentPage)
            pagination.innerHTML += `<span class="pagination-link" data-id="${i-1}">${i}</span>\n`;
          else 
            pagination.innerHTML += `<span class="pagination-link main-link" data-id="${i-1}">${i}</span>\n`;
        }
        if (currentPage == 3) {
          pagination.innerHTML += `<span class="pagination-link" data-id="${3}">${4}</span>\n`;
        }
        pagination.innerHTML += `<span class="dots">...</span>\n`;
        pagination.innerHTML += `<span class="pagination-link" data-id="${pages-1}">${pages}</span>\n`;
      } else if (currentPage > pages - 3) {
        pagination.innerHTML += `<span class="pagination-link" data-id="${0}">${1}</span>\n`;
        pagination.innerHTML += `<span class="dots">...</span>\n`;
        if (pages-2 == currentPage) {
          pagination.innerHTML += `<span class="pagination-link" data-id="${currentPage-2}">${currentPage-1}</span>\n`;
        }
        for(let i = pages-2; i <= pages; i++) {
          if (i != currentPage)
            pagination.innerHTML += `<span class="pagination-link" data-id="${i-1}">${i}</span>\n`;
          else 
            pagination.innerHTML += `<span class="pagination-link main-link" data-id="${i-1}">${i}</span>\n`;
        }
      } else {
        pagination.innerHTML += `<span class="pagination-link" data-id="${0}">${1}</span>\n`;
        pagination.innerHTML += `<span class="dots">...</span>\n`;
        for(let i = currentPage-1; i <= currentPage+1; i++) {
          if (i != currentPage)
            pagination.innerHTML += `<span class="pagination-link" data-id="${i-1}">${i}</span>\n`;
          else 
            pagination.innerHTML += `<span class="pagination-link main-link" data-id="${i-1}">${i}</span>\n`;
        }
        pagination.innerHTML += `<span class="dots">...</span>\n`;
        pagination.innerHTML += `<span class="pagination-link" data-id="${pages-1}">${pages}</span>\n`;
      }
    }
  }
}

getListAuto(glNumber, search).then(fillTable).catch(viewError);


/* Обработка нажатия кнопки "Добавить авто" */
document.querySelector('.add-btn').addEventListener('click',function(e) {
  e.preventDefault();
  document.querySelector('.form-area').style.display = 'block';
});

/* Обработка нажатия на "крестик" для закрытия формы добавления */
document.querySelector('.crest').addEventListener('click',function(e) {
  e.preventDefault();
  document.querySelector('.form-area').style.display = 'none';
});

/* Обработка удаления автомобиля */
document.querySelector('.table').addEventListener('click',function(e) {
  const target = e.target;
  
  if (target.classList.contains('delete-auto')) {
    const number = target.parentNode.getAttribute('data-id');
    deleteAuto(number).then(deleteAutoResp).catch(viewError);
  }
});

/* Обработка нажатия на кнопку "Добавить" при добавлении автомобиля в базу */
document.querySelector('.form-button').addEventListener('click',function(e) {
  const number = document.querySelector('.form-number');
  const name = document.querySelector('.form-name');
  const form = document.querySelector('.form-area');

  if (checkNumber(number.value)) {
    if (checkName(name.value)) {
      form.style.display = 'none';
      addAuto(number.value, name.value).then(addAutoResp).catch(viewError);
      number.value = '';
      name.value = '';
    } else {
      noty('Поле для ввода марки не должно быть пустым', 'error');
    }
  } else {
    noty('Неправильно введён номер', 'error');
  }
});
const checkNumber = value => {
  const r = /^[ABEKMHOPCTYX]\d{3}(?<!000)[ABEKMHOPCTYX]{2}\d{2,3}$/ui;
  if (value.match(r)){
    return true;
  } else {
    return false;
  }
}
const checkName = value => {
  if (value.length > 1) {
    return true;
  } else {
    return false;
  }
}

/* Переход по страницам таблицы */
document.querySelector('body').addEventListener('click',function(e) {
  const target = e.target;
  if (target.classList.contains('pagination-link')) {
    const page = +target.getAttribute("data-id");
    glNumber = page;
    // localStorage.setItem('number', glNumber);
    // debugger;
    getListAuto(glNumber, search).then(fillTable).catch(viewError);
  }
});
/* Обработка поиска */
document.querySelector('.input-btn').addEventListener('click',function(e) {
  const number = document.querySelector('.search').value;
  if (number != search) {
    search = number;
    glNumber = 0;
    // localStorage.setItem('search',number);
    // localStorage.setItem('number',glNumber);
    getListAuto(glNumber, search).then(fillTable).catch(viewError);
  }
});

function noty(text, type) {
  new Noty({
    type,
    text,
    theme: 'relax',
    layout: 'topRight',
    timeout: 1000,
  }).show();
}