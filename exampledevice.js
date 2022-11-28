 const ex_devices={
    "name": "esp",
    "ip":"127.0.0.1",
    "topicListInput": [
        {
            "nome": "Led1",
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
            "stato":" non rilevato"
        }
    ]
}

module.exports ={ ex_devices}