Anthill.globalizer = {
    us : {
        messageBox : {
            logoutTitle: 'Logout',
            logoutMsg: 'Are you sure you want to logout and clear login information?',
            exitTitle: 'Exit',
            exitMsg: 'Are you sure want to exit?'
        },
        loader : {
            load: 'Loading',
            regular: 'Please wait',
            language: 'Define system language',
            login: 'Login to system',
            tools: 'Load available tools'
        },
        form : {
            login: 'Login',
            language: 'Language',
            guest: 'Guest',
            user_name: 'User name',
            user_password: 'Password',
            user_remember: 'Remember',
            item: 'Item',
            items: 'Items'
        },
        error : {
            json : 'An error occurred due to invalid response data in the JSON file used by this request',
            status : {
                100 : {
                    msg : 'Continue',
                    desc: 'Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request'
                },
                101 : {
                    msg : 'Switching Protocols',
                    desc: 'The server switches protocol'
                },
                200 : {
                    msg : 'OK',
                    desc: 'The request is OK'
                },
                201 : {
                    msg : 'Created',
                    desc: 'The request is complete, and a new resource is created'
                },
                202 : {
                    msg : 'Accepted',
                    desc: 'The request is accepted for processing, but the processing is not complete'
                },
                203 : {msg : 'Non-authoritative Information'},
                204 : {msg : 'No Content'},
                205 : {msg : 'Reset Content'},
                206 : {msg : 'Partial Content'},
                300 : {
                    msg : 'Multiple Choices',
                    desc: 'A link list. The user can select a link and go to that location. Maximum five addresses'
                },
                301 : {
                    msg : 'Moved Permanently',
                    desc: 'The requested page has moved to a new url'
                },
                302 : {
                    msg : 'Found',
                    desc: 'The requested page has moved temporarily to a new url'
                },
                303 : {
                    msg : 'See Other',
                    desc: 'The requested page can be found under a different url'
                },
                304 : {msg : 'Not Modified'},
                305 : {msg : 'Use Proxy'},
                306 : {
                    msg : 'Unused',
                    desc: 'This code was used in a previous version. It is no longer used, but the code is reserved'
                },
                307 : {
                    msg : 'Temporary Redirect',
                    desc: 'The requested page has moved temporarily to a new url'
                },
                400 : {
                    msg : 'Bad Request',
                    desc: 'The server did not understand the request'
                },
                401 : {
                    msg : 'Unauthorized',
                    desc: 'The requested page needs a username and a password'
                },
                402 : {
                    msg : 'Payment Required',
                    desc: 'You can not use this code yet'
                },
                403 : {
                    msg : 'Forbidden',
                    desc: 'Access is forbidden to the requested page'
                },
                404 : {
                    msg : 'Not Found',
                    desc: 'The server can not find the requested page'
                },
                405 : {
                    msg : 'Method Not Allowed',
                    desc: 'The method specified in the request is not allowed'
                },
                406 : {
                    msg : 'Not Acceptable',
                    desc: 'The server can only generate a response that is not accepted by the client'
                },
                407 : {
                    msg : 'Proxy Authentication Required',
                    desc: 'You must authenticate with a proxy server before this request can be served'
                },
                408 : {
                    msg : 'Request Timeout',
                    desc: 'The request took longer than the server was prepared to wait'
                },
                409 : {
                    msg : 'Conflict',
                    desc: 'The request could not be completed because of a conflict'
                },
                410 : {
                    msg : 'Gone',
                    desc: 'The requested page is no longer available'
                },
                411 : {
                    msg : 'Length Required',
                    desc: 'The "Content-Length" is not defined. The server will not accept the request without it'
                },
                412 : {
                    msg : 'Precondition Failed',
                    desc: 'The precondition given in the request evaluated to false by the server'
                },
                413 : {
                    msg : 'Request Entity Too Large',
                    desc: 'The server will not accept the request, because the request entity is too large'
                },
                414 : {
                    msg : 'Request-url Too Long',
                    desc: 'The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information'
                },
                415 : {
                    msg : 'Unsupported Media Type',
                    desc: 'The server will not accept the request, because the media type is not supported'
                },
                416 : {},
                417 : {msg : 'Expectation Failed'},
                500 : {
                    msg : 'Internal Server Error',
                    desc: 'The request was not completed. The server met an unexpected condition'
                },
                501 : {
                    msg : 'Not Implemented',
                    desc: 'The request was not completed. The server did not support the functionality required'
                },
                502 : {
                    msg : 'Bad Gateway',
                    desc: 'The request was not completed. The server received an invalid response from the upstream server'
                },
                503 : {
                    msg : 'Service Unavailable',
                    desc: 'The request was not completed. The server is temporarily overloading or down'
                },
                504 : {
                    msg : 'Gateway Timeout',
                    desc: 'The gateway has timed out'
                },
                505 : {
                    msg : 'HTTP Version Not Supported',
                    desc: 'The server does not support the "http protocol" version'
                }
            }
        }
    }
};