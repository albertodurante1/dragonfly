 const ex_devices={
    "name": "esp",
    "topicListInput": [
        {
            "nome": "Led",
            "options": [
                "spento",
                "acceso"
            ],
            "stato":"spento"
        },
        {
            "nome": "Led2",
            "options": [
                "spento",
                "acceso"
            ],
            "stato":"spento"
        }
    ],
    "topicListOutput": [
        {
            "nome": "Movimento",
            "stato":"rilevato"
        }
    ]
}

module.exports ={ ex_devices}