const remindMe = {
    appendButton: () => {
        const $menu = $('#top-level-buttons')
        const button = '<button id="yt-remindme"></button>'

        $menu.before(button)
    },

    buttonEventHandler: () => {
        $('body').on('click', '#yt-remindme', () => $('.yt-remindme-modal').addClass('is--active'))
    },

    appendModal: () => {
        const $body = $('body')

        const modal = `
        <div class="yt-remindme-modal">
            <span class="yt-remindme-modal--overlay"></span>
            <div class="yt-remindme-modal--inner">
                <p class="yt-remindme-modal--inner__heading">Quando eu devo te lembrar?</p>

                <div class="yt-remindme-modal--inner__datepicker">
                    <input id="yt-remindme--datepicker" name="yt-remindme-date" type="text" title="Obrigatório" placeholder="Escolha o dia" data-datedropper required>
                    <input name="yt-remindme-hour" type="text" maxlength="5" minlength="3" title="Obrigatório" placeholder="Digite a hora. ex.: 8:30" required>
                </div>

                <div class="yt-remindme-modal--inner__actions">
                    <button id="yt-remindme--close">sair</button>
                    <button id="yt-remindme--submit">marcar</button>
                </div>
            </div>
        </div>`

        $body.append(modal)
    },

    modalButtonsEventhandler: () => {
        var $modal = $('.yt-remindme-modal')

        var exitHandler = () => {
            var closeModal = () => $modal.removeClass('is--active')

            $('body').on('click', '#yt-remindme--close, .yt-remindme-modal--overlay', () => {
                closeModal()
            })

            $('body').on('keyup', event => {
                (event.key === 'Escape') ? closeModal() : null;
            })
        }

        var scheduleHandler = () => {
            $('body').on('click', '#yt-remindme--submit', () => {
                // $('#yt-remindme--datepicker').dateDropper('getDate', date => console.log(`A data é ${date.formatted}`))
                var $datepickerDiv = $('.yt-remindme-modal--inner__datepicker'),
                    $hourInput = $datepickerDiv.children('input[name="yt-remindme-hour"]')[0],
                    value = $hourInput.value,
                    isHourValid = remindMe.__hourValidation(remindMe.__sanitizeHour(value))

                isHourValid ? console.log('COERENTE') : console.log('ALGUMA COISA ERRADA')
            })
        }

        exitHandler()
        scheduleHandler()
    },

    dateDropperExec: () => {
        var $datepicker = $('#yt-remindme--datepicker')

        $datepicker.dateDropper({
            theme: 'youtube-remind-me',
            lang: 'pt',
            format: 'd/m/Y - l'
        })
    },

    hourMask: () => {
        var $datepickerDiv = $('.yt-remindme-modal--inner__datepicker'),
            $hourInput = $datepickerDiv.children('input[name="yt-remindme-hour"]')

        $hourInput.on('input', event => {
            var _this = event.target,
                value = _this.value,
                sanitizedValue = remindMe.__sanitizeHour(value)

            if ( sanitizedValue.length >= 3 ) {
                sanitizedValue = sanitizedValue.split('')
                
                sanitizedValue.splice(( sanitizedValue.length - 2 ), 0, ':')

                sanitizedValue = sanitizedValue.join('')
            }

            _this.value = sanitizedValue

        })
    },

    __hourValidation: value => {
        var typeOfInput = (typeof parseInt(value)).toString()
        if( value && typeOfInput != 'NaN' ) {
            return true
        }
        
        return false
        
    },
    
    __sanitizeHour: value => {
        var sanitizedValue = ( value ) ? value.replace(':', '') : false

        return sanitizedValue
    },

    init: () => {
        console.log('INICIADO');
        
        remindMe.appendButton()
        remindMe.buttonEventHandler()
        remindMe.appendModal()
        remindMe.modalButtonsEventhandler()
        remindMe.dateDropperExec()
        remindMe.hourMask()
    }
}

$(function() {
    var waitForMenu = setInterval(() => {
        const isMenuVisible = $('#top-level-buttons.ytd-menu-renderer').length
        if(isMenuVisible) {
            clearInterval(waitForMenu)
        }
    }, 500)

    setTimeout(() => {
        remindMe.init();
    }, 2000);
})