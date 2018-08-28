<?php
/*
 *  CONFIGURE EVERYTHING HERE
 */

// an email address that will be in the From field of the email.
$from = 'Join the journey form <info@axiado.com>';

// an email address that will receive the email with the output of the form
$sendTo = 'Join the journey form <info@axiado.com>';

// subject of the email
$subject = 'New message from Join the Journey Page';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('name' => 'Name', 'company' => 'Company', 'phone' => 'Phone', 'email' => 'Email', 'opt-in' => 'Opt-in','message' => 'Message'); 

// message that will be displayed when everything is OK :)
$okMessage = 'Thank you. We will get in touch with you soon.';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting the form. Please try again later';

/*
 *  LET'S DO THE SENDING
 */

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try
{

    if(count($_POST) == 0) throw new \Exception('Form is empty');
    $emailTo = $_POST['email'];
    $emailText = "You have a new message from your contact form\n=============================\n";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email 
        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    // All the neccessary headers for the email.
    $headers = array('Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );
    $emailTextConfirmation = "Hello,

    Thank you for your interest in creating a secure internet for everyone.
    We would like to meet with you to learn more about your company and your needs. If you’d like a call from us, please respond with your phone number.

    Regards,

    Axiado Team";
    // Send email
    mail($sendTo, $subject, $emailText, implode("\n", $headers));
    mail($emailTo, 'Sign up confirmation.', $emailTextConfirmation, implode("\n", $headers));

    $responseArray = array('type' => 'success', 'message' => $okMessage);
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}


// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}