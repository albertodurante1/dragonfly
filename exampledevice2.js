const ex_devices2={
    "name": "esp",
    "ip":"127.0.0.1",
    "topicListInput": [
        {
            "nome": "Led1",
            "options": [
                "spento",
                "acceso"
            ],
            "stato":"acceso"
        }
    
    ],
    "topicListOutput": [
        {
            "nome": "Movimento",
            "stato":" non rilevato"
        }
    ]
}

module.exports ={ ex_devices2}