var entries = [
    { "id": 1, "title": "第一篇", "body": "今天发送了xxx1", "published": "6/2/2017" },
    { "id": 2, "title": "第二篇", "body": "今天发送了xxx2", "published": "6/3/2017" },
    { "id": 3, "title": "第三篇", "body": "今天发送了xxx3", "published": "6/4/2017" },
    { "id": 4, "title": "第四篇", "body": "今天发送了xxx4", "published": "6/5/2017" },
    { "id": 5, "title": "第五篇", "body": "今天发送了xxx5", "published": "6/10/2017" },
    { "id": 6, "title": "第六篇", "body": "今天发送了xxx6", "published": "6/12/2017" }
];

exports.getBlogEntries = function() {
    return entries;
}

exports.getBlogEntry = function(id) {
    for (var i = 0; i < entries.length; i++) {
        if (entries[i].id == id) return entries[i];
    }
}