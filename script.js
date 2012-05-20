$(function() {
  var get_tasks = function() {
    var data = localStorage['tasks'];
    if (!data) {
      return {};
    } else {
      return JSON.parse(data);
    }
  };

  var save_tasks = function(data) {
    localStorage['tasks'] = JSON.stringify(data);
  };

  var append_task = function(task) {
    var $task = $('<li/>').attr({id: task.id});
    var $input = $('<input/>').attr({type: 'checkbox', class: 'done'});
    if (task.done) {
      $task.css('text-decoration', 'line-through');
      $input.attr({checked: true});
    }
    $input.change(function() {
      var tasks = get_tasks();
      if ($(this).attr('checked')) {
        $task.css('text-decoration', 'line-through');
        tasks[task.id].done = true;
      } else {
        $task.css('text-decoration', 'none');
        tasks[task.id].done = false;
      }
      save_tasks(tasks);
    });
    var $span = $('<span/>').text(task.text);
    var $delete_button = $('<input/>').attr(
      {type: 'button', class: 'delete', value: '削除'}
    );
    $delete_button.click(function() {
      var tasks = get_tasks();
      delete tasks[task.id];
      save_tasks(tasks);
      $task.fadeOut();
    });
    $task.
      append($input).
      append($span).
      append($delete_button).
      appendTo('#tasks');
  };

  var load_tasks = function() {
    var tasks = get_tasks();
    $.each(tasks, function(key, task) {
      append_task(task);
    });
  };

  $('#new_task_button').click(function() {
    var $task_textbox = $('#new_task');

    var task_id = (new Date()).toJSON();
    var task_done = false;
    var task_text = $task_textbox.val();

    // DBへ保存
    tasks = get_tasks();
    tasks[task_id] = {id: task_id, text: task_text, done: false}
    save_tasks(tasks);

    // 表示
    append_task(tasks[task_id]);

    $task_textbox.val('');
  });

  load_tasks();
});
