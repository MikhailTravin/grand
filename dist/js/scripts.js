const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

//Маска
const telephone = document.querySelectorAll('.telephone');
if (telephone) {
  Inputmask({
    "mask": "+7 (999) 999 - 99 - 99",
    "showMaskOnHover": false,
  }).mask(telephone);
}

//========================================================================================================================================================

class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    }
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOptionsScroll: "select__scroll",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectArrow: "select__arrow",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label",
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  getSelectClass(className) {
    return `.${className}`;
  }
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }
  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;

    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
    }

    this.selectBuild(originalSelect);

    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;

    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;

    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);

    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;

    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;

    this.selectDisabled(selectItem, originalSelect);
  }
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {

            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

    this.setOptionsPosition(selectItem);

    this.selectsСlose();

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);

        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));

    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    const selectedOptions = this.getSelectedOptionsData(originalSelect);

    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = selectedOptions.elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="${this.selectClasses.classSelectTag}">${this.getSelectElementContent(option)}</span>`).join('');

      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }

    if (selectedOptions.values.length > 0) {
      selectTitleValue = selectTitleValue.length ? selectTitleValue : '';
    } else {
      selectTitleValue = originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '';
    }

    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }

    selectedOptions.values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);

    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = selectedOptions.elements.length && selectedOptions.elements[0] && selectedOptions.elements[0].dataset.class ? ` ${selectedOptions.elements[0].dataset.class}` : '';

      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span><span class="${this.selectClasses.classSelectArrow}"></span></span></button>`;
    }
  }
  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }

  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      if (originalSelect.selectedIndex >= 0 && originalSelect.options[originalSelect.selectedIndex]) {
        const option = originalSelect.options[originalSelect.selectedIndex];
        if (option.value) {
          selectedOptions.push(option);
        }
      }
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option && option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;

      selectOptions = selectOptions.filter(option => option.value);

      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';

    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple && selectOption.value ? `hidden` : ``;

    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;

      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }
  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (optionItem.dataset.value) {
          if (!originalSelect.hasAttribute('data-show-selected')) {
            setTimeout(() => {
              if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
                selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
              }
              optionItem.hidden = true;
            }, this.config.speed);
          }
          originalSelect.value = optionItem.dataset.value;
          this.selectAction(selectItem);
        }
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      if (window.formValidate) {
        window.formValidate.validateInput(originalSelect);
      }
    }
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      const form = originalSelect.closest('form');
      if (form) {
        form.appendChild(tempButton);
        tempButton.click();
        tempButton.remove();
      }
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = false;
    }
  }
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    window.modules_flsModules = window.modules_flsModules || {};
    modules_flsModules.select = new SelectConstructor({});
  });
} else {
  window.modules_flsModules = window.modules_flsModules || {};
  modules_flsModules.select = new SelectConstructor({});
}

//========================================================================================================================================================

if (document.querySelector('.block-products__slider')) {

  const swiperProducts = new Swiper('.block-products__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 400,
    navigation: {
      prevEl: '.block-products__arrow-prev',
      nextEl: '.block-products__arrow-next',
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      1470: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
}

if (document.querySelector('.block-news__slider')) {

  const swiperNews = new Swiper('.block-news__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 400,
    navigation: {
      prevEl: '.block-news__arrow-prev',
      nextEl: '.block-news__arrow-next',
    },
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      1470: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector('.block-partners__slider')) {

  const swiperNews = new Swiper('.block-partners__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    loop: true,
    lazy: true,
    speed: 1000,
    autoplay: {
      delay: 1000,
    },
    navigation: {
      prevEl: '.block-partners__arrow-prev',
      nextEl: '.block-partners__arrow-next',
    },
    breakpoints: {
      992: {
        spaceBetween: 20,
      },
      1470: {
        spaceBetween: 40,
      },
    },
  });
}

//========================================================================================================================================================

const iconMenu = document.querySelector('.header__burger');
const headerBody = document.querySelector('.header-menu');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();

    document.documentElement.classList.toggle("menu-open");
  });

  document.addEventListener('click', function (e) {
    const isClickInsideHeaderBody = headerBody && headerBody.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);

    if (!isClickInsideHeaderBody && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
      document.documentElement.classList.add('header-scroll');
    } else {
      header.classList.remove('_header-scroll');
      document.documentElement.classList.remove('header-scroll');
    }
  });
}

//========================================================================================================================================================

//Спойлер
function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [maxWidth, type] = mediaQuery.split(",");
        const width = parseInt(maxWidth);

        if (type === "max" && window.innerWidth <= width) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (type === "max" && window.innerWidth > width) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);

          initCloseButtons(spollersBlock);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        }));
      }
    }

    function initCloseButtons(spollersBlock) {
      const closeButtons = spollersBlock.querySelectorAll('.cabinet-orders-spollers__button');

      closeButtons.forEach(button => {
        button.removeEventListener('click', closeSpollerHandler);
        button.addEventListener('click', closeSpollerHandler);
      });
    }

    function closeSpollerHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      const button = e.currentTarget;
      const spollersBlock = button.closest('[data-spollers]');
      const spollerItem = button.closest('.cabinet-orders-spollers__item');

      if (spollersBlock && spollerItem) {
        const spollerTitle = spollerItem.querySelector('[data-spoller]');

        if (spollerTitle && spollerTitle.classList.contains('_spoller-active')) {
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

          spollerTitle.classList.remove('_spoller-active');
          spollerItem.classList.remove('_spoller-active');

          const contentBlock = spollerTitle.nextElementSibling;
          _slideUp(contentBlock, spollerSpeed);
        }
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoller]")) {
        const spollerTitle = el.closest("[data-spoller]");

        const spollerItem = spollerTitle.closest(".spollers__item, .cabinet-orders-spollers__item");
        const spollersBlock = spollerTitle.closest("[data-spollers]");

        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle("_spoller-active");
          if (spollerItem) spollerItem.classList.toggle("_spoller-active");

          const contentBlock = spollerTitle.nextElementSibling;
          _slideToggle(contentBlock, spollerSpeed);

          e.preventDefault();
        }
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .cabinet-orders-spollers__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");

            const spollerItem = spollerClose.closest(".spollers__item, .cabinet-orders-spollers__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}
spollers();
window.addEventListener('resize', function () {
  spollers();
});

//========================================================================================================================================================
/*


const menuItems = document.querySelectorAll('.header-menu__item');

if (menuItems) {
  function handleArrowClick(event) {
    if (window.innerWidth <= 1100) {
      const menuItem = this.closest('.header-menu__item');
      if (menuItem) {
        event.stopPropagation();
        menuItem.classList.toggle('active');
      }
    }
  }

  function handleBackClick(event) {
    if (window.innerWidth <= 1100) {
      const menuItem = this.closest('.header-menu__item');
      if (menuItem) {
        event.stopPropagation();
        menuItem.classList.remove('active');
      }
    }
  }

  menuItems.forEach(item => {
    const arrow = item.querySelector('.header-menu__arrow');
    if (arrow) {
      arrow.addEventListener('click', handleArrowClick);
    }

    const backButton = item.querySelector('.header-menu__back');
    if (backButton) {
      backButton.addEventListener('click', handleBackClick);
    }
  });

  document.addEventListener('click', function (event) {
    if (window.innerWidth <= 1100) {
      const isClickInsideMenu = event.target.closest('.header-menu__item');
      if (!isClickInsideMenu) {
        menuItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1100) {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
}

//========================================================================================================================================================



//========================================================================================================================================================

if (document.querySelector('.block-advertising__slider')) {
  const slidesCount = document.querySelectorAll('.block-advertising__slider .swiper-slide').length;

  const swiperAdvertising = new Swiper('.block-advertising__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: slidesCount >= 2,
    loopedSlides: slidesCount,
    loopAdditionalSlides: slidesCount,
    lazy: true,
    speed: 1000,
    autoplay: {
      delay: 1000,
    },
    breakpoints: {
      480: {
        slidesPerView: Math.min(2, slidesCount),
      },
      992: {
        slidesPerView: Math.min(3, slidesCount),
      },
    },
  });
}

if (document.querySelector('.block-other__slider')) {
  const swiperOther = new Swiper('.block-other__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 400,
    navigation: {
      prevEl: '.block-other__arrow-prev',
      nextEl: '.block-other__arrow-next',
    },
    breakpoints: {
      480: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
  });
}

if (document.querySelector('.block-intro__slider')) {
  const swiperIntro = new Swiper('.block-intro__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    lazy: true,
    speed: 800,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.block-intro__pagination',
      clickable: true,
    }
  });
}

if (document.querySelector('.block-card__slider')) {
  const swiperCard = new Swiper('.block-card__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    lazy: true,
    speed: 800,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.block-card__pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });
}

if (document.querySelector('.block-article__slider')) {
  const swiperArticle = new Swiper('.block-article__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    navigation: {
      prevEl: '.block-article__arrow-prev',
      nextEl: '.block-article__arrow-next',
    },
    pagination: {
      el: '.block-article__pagination',
      clickable: true,
    },
  });
}

const slidersCalendar = document.querySelectorAll('.block-calendar__slider');
if (slidersCalendar.length) {
  slidersCalendar.forEach((slider) => {
    const paginationEl = slider.querySelector('.block-calendar__pagination');

    const swiperCalendar = new Swiper(slider, {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      lazy: true,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
      }
    });
  });
}

const sliderCalendarNav = document.querySelector('.block-calendar-nav__slider');
if (sliderCalendarNav) {
  const wrapper = document.querySelector('.block-calendar-nav__wrapper');
  const prevBtn = document.querySelector('.block-calendar-nav__arrow-prev');
  const nextBtn = document.querySelector('.block-calendar-nav__arrow-next');
  const content = document.querySelector('.block-calendar-nav__content');

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  function updateButtonsState() {
    const scrollLeft = sliderCalendarNav.scrollLeft;
    const maxScrollLeft = sliderCalendarNav.scrollWidth - sliderCalendarNav.clientWidth;

    if (scrollLeft <= 1) {
      sliderCalendarNav.classList.add('is-start');
      if (content) content.classList.add('is-start');
      if (prevBtn) prevBtn.classList.add('disabled');
    } else {
      sliderCalendarNav.classList.remove('is-start');
      if (content) content.classList.remove('is-start');
      if (prevBtn) prevBtn.classList.remove('disabled');
    }

    if (scrollLeft >= maxScrollLeft - 1) {
      sliderCalendarNav.classList.add('is-end');
      if (content) content.classList.add('is-end');
      if (nextBtn) nextBtn.classList.add('disabled');
    } else {
      sliderCalendarNav.classList.remove('is-end');
      if (content) content.classList.remove('is-end');
      if (nextBtn) nextBtn.classList.remove('disabled');
    }
  }

  function scrollTo(direction) {
    const scrollAmount = sliderCalendarNav.clientWidth * 0.8;
    let newScrollLeft;

    if (direction === 'next') {
      newScrollLeft = sliderCalendarNav.scrollLeft + scrollAmount;
    } else {
      newScrollLeft = sliderCalendarNav.scrollLeft - scrollAmount;
    }

    sliderCalendarNav.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(updateButtonsState, 400);
  }

  sliderCalendarNav.addEventListener('scroll', updateButtonsState);
  window.addEventListener('resize', updateButtonsState);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (prevBtn.classList.contains('disabled')) return;
      scrollTo('prev');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (nextBtn.classList.contains('disabled')) return;
      scrollTo('next');
    });
  }

  sliderCalendarNav.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - sliderCalendarNav.offsetLeft;
    startScrollLeft = sliderCalendarNav.scrollLeft;
    sliderCalendarNav.style.cursor = 'grabbing';
    sliderCalendarNav.style.userSelect = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderCalendarNav.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderCalendarNav.scrollLeft = startScrollLeft - walk;
    updateButtonsState();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    sliderCalendarNav.style.cursor = 'grab';
    sliderCalendarNav.style.userSelect = '';
  });

  sliderCalendarNav.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  sliderCalendarNav.style.cursor = 'grab';

  let touchStartX = 0;
  let touchStartScrollLeft = 0;

  sliderCalendarNav.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchStartScrollLeft = sliderCalendarNav.scrollLeft;
  });

  sliderCalendarNav.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].pageX;
    const walk = (touchX - touchStartX) * 1.5;
    sliderCalendarNav.scrollLeft = touchStartScrollLeft - walk;
    updateButtonsState();
  });

  updateButtonsState();
};

//========================================================================================================================================================

let dataTabs = document.querySelectorAll('[data-tabs]');
if (dataTabs) {
  dataTabs.forEach(tabBlock => {
    const tabButtons = tabBlock.querySelectorAll('[data-tab-title]');
    const tabContents = tabBlock.querySelectorAll('[data-tab-body]');

    if (!tabButtons.length || !tabContents.length) return;

    const activateTab = (tabId) => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      const activeButton = tabBlock.querySelector(`[data-tab-title][data-tab="${tabId}"]`);
      const activeContent = tabBlock.querySelector(`[data-tab-body][data-tab="${tabId}"]`);

      if (activeButton) activeButton.classList.add('active');
      if (activeContent) activeContent.classList.add('active');
    };

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) activateTab(tabId);
      });
    });

    const activeTabButton = tabBlock.querySelector('[data-tab-title].active');
    if (activeTabButton) {
      const initialTabId = activeTabButton.getAttribute('data-tab');
      if (initialTabId) activateTab(initialTabId);
    } else if (tabButtons.length) {
      const firstTabId = tabButtons[0].getAttribute('data-tab');
      if (firstTabId) activateTab(firstTabId);
    }

    const prevArrow = tabBlock.querySelector('.arrow-prev');
    const nextArrow = tabBlock.querySelector('.arrow-next');
    const sliderWrapper = tabBlock.querySelector('.block-calendar-nav__wrapper');
    const slides = tabBlock.querySelectorAll('.block-calendar-nav__slide');

    if (prevArrow && nextArrow && sliderWrapper && slides.length) {
      let currentSlide = 0;
      let slideWidth = slides[0].offsetWidth;

      const updateSliderPosition = (animate = true) => {
        if (sliderWrapper) {
          sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
          sliderWrapper.style.transition = animate ? 'transform 0.3s ease' : 'none';
        }
      };

      const updateArrowsVisibility = () => {
        prevArrow.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevArrow.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
        nextArrow.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
        nextArrow.style.pointerEvents = currentSlide === slides.length - 1 ? 'none' : 'auto';
      };

      prevArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide--;
          updateSliderPosition(true);
          updateArrowsVisibility();
        }
      });

      nextArrow.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
          currentSlide++;
          updateSliderPosition(true);
          updateArrowsVisibility();
        }
      });

      let isResizing = false;
      window.addEventListener('resize', () => {
        if (isResizing) return;
        isResizing = true;
        requestAnimationFrame(() => {
          const newSlideWidth = slides[0].offsetWidth;
          if (newSlideWidth !== slideWidth) {
            slideWidth = newSlideWidth;
            updateSliderPosition(false);
            updateArrowsVisibility();
          }
          isResizing = false;
        });
      });

      updateArrowsVisibility();
    }
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

const toggle = document.getElementById('specialVisionToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('special-vision');
    localStorage.setItem('specialVision', document.body.classList.contains('special-vision'));
  });

  if (localStorage.getItem('specialVision') === 'true') {
    document.body.classList.add('special-vision');
  }
}

//========================================================================================================================================================

//Яндекс карта
const map = document.querySelector('#map1');
if (map) {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map1', {
      center: [55.765990, 37.684560],
      zoom: 15,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

    myMap.geoObjects
      .add(new ymaps.Placemark([55.765990, 37.684560], {
      }))

  };
}

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });

  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }

      if (targetElement.value.trim()) {
        targetElement.parentElement.classList.add('filled');
      } else {
        targetElement.parentElement.classList.remove('filled');
      }

      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;

      const form = targetElement.closest('form');
      if (form) {
        const submitBtn = form.querySelector('.btn.disabled');
        if (submitBtn) {
          setTimeout(() => {
            const requiredFields = form.querySelectorAll('[data-required]');
            let allFilled = true;

            requiredFields.forEach(field => {
              if (field.type === 'checkbox') {
                if (!field.checked) allFilled = false;
              } else {
                if (!field.value.trim()) allFilled = false;
              }
            });

            if (allFilled) {
              submitBtn.classList.remove('disabled');
            } else {
              submitBtn.classList.add('disabled');
            }
          }, 50);
        }
      }
    }
  });

  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const parentInputBlock = viewpassBlock.closest('.form__input');
        const input = parentInputBlock ? parentInputBlock.querySelector('input') : null;

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден для переключения видимости пароля!');
        }
      }
    });
  }

  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;

        setHeight(textarea, Math.min(startHeight, maxHeight));

        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });

      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}

formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');

    const formInput = formRequiredItem.closest('.form__input');
    if (formInput) {
      const existingError = formInput.querySelector('.form-error');
      if (existingError) existingError.remove();
    }

    if (formRequiredItem.dataset.error) {
      if (formInput) {
        formInput.insertAdjacentHTML('beforeend', `<div class="form-error">${formRequiredItem.dataset.error}</div>`);
      } else {
        formRequiredItem.parentElement.insertAdjacentHTML('afterend', `<div class="form-error">${formRequiredItem.dataset.error}</div>`);
      }
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');

    const formInput = formRequiredItem.closest('.form__input');
    if (formInput) {
      const errorMsg = formInput.querySelector('.form-error');
      if (errorMsg) errorMsg.remove();
    }

    const errorMsgParent = formRequiredItem.parentElement.parentElement?.querySelector('.form-error');
    if (errorMsgParent) errorMsgParent.remove();
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
    if (formRequiredItem.value.trim()) {
      formRequiredItem.parentElement.classList.add('filled');
    }
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');

        el.classList.remove('_form-success');
        el.parentElement.classList.remove('_form-success');

        el.classList.remove('_form-error');
        el.parentElement.classList.remove('_form-error');

        el.parentElement.classList.remove('filled');

        this.removeError(el);

        if (el.classList.contains('telephone') && el.clearFilled) {
          el.clearFilled();
        }
      }

      form.querySelectorAll('.form-error').forEach(error => error.remove());

      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
          checkbox.classList.remove('_form-success');
          checkbox.closest('.checkbox')?.classList.remove('_form-success');
        }
      }

      if (typeof modules_flsModules !== 'undefined' && modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }
  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        try {
          const response = await fetch(formAction, {
            method: formMethod,
            body: formData
          });
          if (response.ok) {
            let responseResult = await response.json();
            form.classList.remove('_sending');
            formSent(form, responseResult);
          } else {
            alert("Помилка сервера");
            form.classList.remove('_sending');
          }
        } catch (err) {
          alert("Помилка з'єднання");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        if (typeof gotoBlock === 'function') {
          gotoBlock(formGoToErrorClass, true, 1000);
        }
      }
    }
  }
  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));

    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    setTimeout(() => {
      if (typeof modules_flsModules !== 'undefined' && modules_flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? modules_flsModules.popup.open(popup) : null;
      }
    }, 0);

    formValidate.formClean(form);
  }
}

function initFormValidationObserver() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    const submitBtn = form.querySelector('.btn.disabled');
    if (!submitBtn) return;

    function checkRequiredFields() {
      const requiredFields = form.querySelectorAll('[data-required]');
      let allFilled = true;

      requiredFields.forEach(field => {
        if (field.type === 'checkbox') {
          if (!field.checked) {
            allFilled = false;
          }
        }
        else {
          const value = field.value.trim();
          const hasValue = value !== '';

          if (field.dataset.required === 'email' && hasValue) {
            const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
            if (!isValidEmail) {
              allFilled = false;
            }
          }
          else if (field.dataset.validate === 'password-confirm') {
            const passwordInput = document.getElementById('password');
            if (passwordInput && field.value !== passwordInput.value) {
              allFilled = false;
            }
          }
          else if (!hasValue) {
            allFilled = false;
          }
        }
      });

      if (allFilled) {
        submitBtn.classList.remove('disabled');
      } else {
        submitBtn.classList.add('disabled');
      }

      return allFilled;
    }

    checkRequiredFields();

    const requiredFields = form.querySelectorAll('[data-required]');
    requiredFields.forEach(field => {
      if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') {
        field.addEventListener('input', () => {
          setTimeout(checkRequiredFields, 0);
        });
        field.addEventListener('change', () => {
          setTimeout(checkRequiredFields, 0);
        });
      }

      if (field.type === 'checkbox') {
        field.addEventListener('change', () => {
          setTimeout(checkRequiredFields, 0);
        });
      }
    });

    form.addEventListener('focusout', (e) => {
      const target = e.target;
      if (target.hasAttribute && target.hasAttribute('data-required')) {
        setTimeout(checkRequiredFields, 100);
      }
    });
  });
}

function initCodeInputs() {
  const codeInputs = document.querySelectorAll('.popup-code__inputs input');
  if (!codeInputs.length) return;

  function setInputValue(input, value) {
    const digits = value.replace(/\D/g, '');
    input.value = digits.slice(0, 1);
    return input.value;
  }

  function focusNextInput(currentInput) {
    const inputs = Array.from(currentInput.parentElement.querySelectorAll('input'));
    const currentIndex = inputs.indexOf(currentInput);
    if (currentIndex < inputs.length - 1) {
      inputs[currentIndex + 1].focus();
      return true;
    }
    return false;
  }

  function focusPrevInput(currentInput) {
    const inputs = Array.from(currentInput.parentElement.querySelectorAll('input'));
    const currentIndex = inputs.indexOf(currentInput);
    if (currentIndex > 0) {
      inputs[currentIndex - 1].focus();
      return true;
    }
    return false;
  }

  codeInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const oldValue = input.value;
      const newValue = setInputValue(input, input.value);

      if (newValue && newValue !== oldValue) {
        focusNextInput(input);
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (input.value === '') {
          focusPrevInput(input);
        } else {
          input.value = '';
          e.preventDefault();
        }
      }

      if (e.key === 'Delete') {
        input.value = '';
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft') {
        focusPrevInput(input);
      }

      if (e.key === 'ArrowRight') {
        focusNextInput(input);
      }

      if (e.key === 'Home') {
        e.preventDefault();
        codeInputs[0].focus();
      }

      if (e.key === 'End') {
        e.preventDefault();
        codeInputs[codeInputs.length - 1].focus();
      }
    });

    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text');
      const digits = pastedText.replace(/\D/g, '').split('');

      digits.forEach((digit, i) => {
        const targetInput = codeInputs[index + i];
        if (targetInput && digit) {
          targetInput.value = digit;
        }
      });

      const nextEmptyIndex = codeInputs.findIndex(inp => inp.value === '');
      if (nextEmptyIndex !== -1) {
        codeInputs[nextEmptyIndex].focus();
      } else {
        codeInputs[codeInputs.length - 1].focus();
      }

      const form = input.closest('form');
      if (form) {
        const submitBtn = form.querySelector('.btn.disabled');
        if (submitBtn) {
          setTimeout(() => {
            const requiredFields = form.querySelectorAll('[data-required]');
            let allFilled = true;

            requiredFields.forEach(field => {
              if (!field.value.trim()) allFilled = false;
            });

            if (allFilled) {
              submitBtn.classList.remove('disabled');
            } else {
              submitBtn.classList.add('disabled');
            }
          }, 50);
        }
      }
    });
  });

  codeInputs[0].focus();
}

function clearCodeInputs() {
  const codeInputs = document.querySelectorAll('.popup-code__inputs input');
  codeInputs.forEach(input => {
    input.value = '';
  });
  if (codeInputs.length) {
    codeInputs[0].focus();
  }
}

initCodeInputs();
formSubmit();
initFormValidationObserver();

//========================================================================================================================================================

const formFile = document.querySelector('.form-file');

if (formFile) {
  const fileInput = document.querySelector('.form-file input[type="file"]');
  const fileNameElement = document.querySelector('.form-file__name');
  const fileSubnameElement = document.querySelector('.form-file__subname');
  const fileIcon = document.querySelector('.form-file__icon');
  const closeButton = document.querySelector('.form-file__close');

  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024;

      if (file.size > maxSize) {
        alert('Файл слишком большой. Максимальный размер 5 МБ.');
        resetFileInput();
        return;
      }

      const fileName = file.name;

      let fileSize = formatFileSize(file.size);

      fileNameElement.textContent = fileName;
      fileSubnameElement.textContent = fileSize;

      const newIconSrc = fileIcon.getAttribute('data-image');
      if (newIconSrc) {
        fileIcon.src = newIconSrc;
      }

      formFile.classList.add('active');
    }
  });

  closeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    resetFileInput();
  });

  function resetFileInput() {
    fileInput.value = '';

    fileNameElement.textContent = 'Прикрепить файл';
    fileSubnameElement.textContent = 'Макс. 5Мб';

    const originalIconSrc = fileIcon.getAttribute('data-original-src');
    if (originalIconSrc) {
      fileIcon.src = originalIconSrc;
    } else {
      const originalSrc = fileIcon.src;
      fileIcon.setAttribute('data-original-src', originalSrc);
      fileIcon.src = originalSrc;
    }

    formFile.classList.remove('active');
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Байт';

    const k = 1024;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = bytes / Math.pow(k, i);
    const formattedSize = size.toFixed(2).replace(/\.00$/, '');

    if (i === 0) {
      return `${Math.round(size)} ${sizes[i]}`;
    }

    return `${formattedSize} ${sizes[i]}`;
  }

  const originalIconSrc = fileIcon.src;
  fileIcon.setAttribute('data-original-src', originalIconSrc);

  formFile.addEventListener('dragover', function (e) {
    e.preventDefault();
    formFile.classList.add('drag-over');
  });

  formFile.addEventListener('dragleave', function (e) {
    e.preventDefault();
    formFile.classList.remove('drag-over');
  });

  formFile.addEventListener('drop', function (e) {
    e.preventDefault();
    formFile.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  });
}*/