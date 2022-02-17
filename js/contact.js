//Javascript for contact form

document.getElementById('contact_mail_btn').addEventListener('click', () => {
    document.getElementById("contact_mail").classList.remove("d-none");
    document.getElementById("contact_meet").classList.add("d-none");
})

document.getElementById('contact_meet_btn').addEventListener('click', () => {
    document.getElementById("contact_meet").classList.remove("d-none");
    document.getElementById("contact_mail").classList.add("d-none");
})

//Submit handler
document.getElementById('contactForm')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        let fields = ['name', 'email', 'phone', 'message'];

        fields.forEach((value => {
            if (document.getElementById(value).value === '') {
                document.getElementById(value + '-invalid-feedback').innerText = '必填';
                document.getElementById(value + '-invalid-feedback').classList.add('d-block');
            } else {
                document.getElementById(value + '-invalid-feedback').classList.remove('d-block');
            }

        }))

        let emailRegex = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.\-])[A-Za-z0-9]+)*\.[A-Za-z]+$/gm;
        let return_value = true;
        //Check email address
        if (document.getElementById('email').value.search(emailRegex) === -1) {
            //Invalid
            document.getElementById('email-invalid-feedback').innerText = 'Email格式錯誤';
            document.getElementById('email-invalid-feedback').classList.add('d-block');
            return_value = false;
        } else {
            document.getElementById('email-invalid-feedback').classList.remove('d-block');
        }

        if (document.getElementById('phone').value.search(/\d/) === -1) {
            document.getElementById('phone-invalid-feedback').innerText = '電話格式錯誤';
            document.getElementById('phone-invalid-feedback').classList.add('d-block');
            return_value = false;
        } else {
            document.getElementById('email-invalid-feedback').classList.add('d-block');
        }

        if (!return_value) {
            return false;
        }

        let date = new Date,
            dformat = [
                    date.getMonth() + 1,
                    date.getDate(),
                    date.getFullYear()
                ].join('/') +
                ' ' +
                [
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds()
                ].join(':');
        let data = {
            message:
                'From: ' + document.getElementById('name').value +
                '<' + document.getElementById('email').value + '> [' + document.getElementById('phone').value + ']\n' +
                'Date: ' + date + '\n' +
                'Subject: ' + document.getElementById('subject').value + '\n' +
                document.getElementById('message').value,
            subject: document.getElementById('subject').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,

        }

        let request = new XMLHttpRequest();
        //Loading
        Swal.fire({
            title: 'Loading...',
            html: 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        //Fire AJAX request
        request.open('POST', 'https://api.frankychen.net/send', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
        request.onreadystatechange = () => {
            if (request.readyState === 4) { //4: Completed
                if (request.status === 204) {
                    swal.fire({
                        icon: 'success',
                        title: '成功!',
                        text: '訊息已發送，我將會盡快與您取得聯繫！'
                    })
                }
            } else {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '發生未預期的錯誤！',
                    footer: '<p>請發送截圖至' +
                        '<a href="mailto:franky920920+sys_error@gmail.com">' +
                        'franky920920+sys_error@gmail.com' +
                        '</a>' +
                        '<br>' +
                        'Error code: HTTP ' + request.status + '</p>'
                })
            }
        }
    })
