<?php include 'proccesing_form.php';?>
<section class="form">
                <form method="get" action="">
                    <h3>Напишите нам</h3>
                    <div class="row">
                        <div class="col">
                            <input name="name" type="text" placeholder="ФИО" required/>
                            <input name="email" type="email" placeholder="Email" required/>
                            <input name="phone" type="text" placeholder="Телефон"/>
                        </div>
                        <div class="col">
                            <textarea name="message" placeholder="Ваше сообщение" required></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button type="submit">отправить вопрос</button>
                        </div>
                    </div>
                </form>
            </section>