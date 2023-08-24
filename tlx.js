// Create a set of parallel arrays for each of the scales
var scale = new Array();
var left = new Array();
var right = new Array();
var def = new Array();
var NUM_SCALES = 6;

scale[0] = 'Mental Demand';
left[0] = 'Low';
right[0] = 'High';
def[0] =
    'How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc)? Was the task easy or demanding, simple or complex, exacting or forgiving?';

scale[1] = 'Physical Demand';
left[1] = 'Low';
right[1] = 'High';
def[1] =
    'How much physical activity was required (e.g., dragging-and-dropping, clicking, typing, etc)? Was the task easy or demanding, slow or brisk, slack or strenuous, restful or laborious?';

scale[2] = 'Temporal Demand';
left[2] = 'Low';
right[2] = 'High';
def[2] =
    'How much time pressure did you feel due to the rate of pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?';

scale[3] = 'Performance';
left[3] = 'Good';
right[3] = 'Poor';
def[3] =
    'How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?';

scale[4] = 'Effort';
left[4] = 'Low';
right[4] = 'High';
def[4] =
    'How hard did you have to work (mentally and physically) to accomplish your level of performance?';

scale[5] = 'Frustration';
left[5] = 'Low';
right[5] = 'High';
def[5] =
    'How insecure, discouraged, irritated, stressed and annoyed versus secure, gratified, content, relaxed and complacent did you feel during the task?';

// Pairs of factors in order in the original instructions, numbers
// refer to the index in the scale, left, right, def arrays.
var pair = new Array();
pair[0] = '4 3';
pair[1] = '2 5';
pair[2] = '2 4';
pair[3] = '1 5';
pair[4] = '3 5';
pair[5] = '1 2';
pair[6] = '1 3';
pair[7] = '2 0';
pair[8] = '5 4';
pair[9] = '3 0';
pair[10] = '3 2';
pair[11] = '0 4';
pair[12] = '0 1';
pair[13] = '4 1';
pair[14] = '5 0';

// Variable where the results end up
var results_rating = new Array();
var results_tally = new Array();
var results_weight = new Array();
var results_overall;

var pair_num = 0;
for (var i = 0; i < NUM_SCALES; i++) results_tally[i] = 0;

// Used to randomize the pairings presented to the user
function randOrd() {
  return Math.round(Math.random()) - 0.5;
}

// Make sure things are good and mixed
for (i = 0; i < 100; i++) {
  pair.sort(randOrd);
}

// They click on a scale entry
function scaleClick(index, val) {
  results_rating[index] = val;

  // Turn background color to white for all cells
  for (i = 5; i <= 100; i += 5) {
    var top = 't_' + index + '_' + i;
    var bottom = 'b_' + index + '_' + i;
    document.getElementById(top).bgColor = '#FFFFFF';
    document.getElementById(bottom).bgColor = '#FFFFFF';
  }

  var top = 't_' + index + '_' + val;
  var bottom = 'b_' + index + '_' + val;
  document.getElementById(top).bgColor = '#AAAAAA';
  document.getElementById(bottom).bgColor = '#AAAAAA';
}

// Return the HTML that produces the table for a given scale
function getScaleHTML(index) {
  var result = '';

  // Outer table with a column for scale, column for definition
  result += '<table><tr><td>';

  // Table that generates the scale
  result += '<table class="scale">';

  // Row 1, just the name of the scale
  result +=
      '<tr><td colspan="20" class="heading">' + scale[index] + '</td></tr>';

  // Row 2, the top half of the scale increments, 20 total columns
  result += '<tr>';
  var num = 1;
  for (var i = 5; i <= 100; i += 5) {
    result += '<td id="t_' + index + '_' + i + '"   class="top' + num +
        '" onMouseUp="scaleClick(' + index + ', ' + i + ');"></td>';
    num++;
    if (num > 2) num = 1;
  }
  result += '</tr>';

  // Row 3, bottom half of the scale increments
  result += '<tr>';
  for (var i = 5; i <= 100; i += 5) {
    result += '<td id="b_' + index + '_' + i +
        '"   class="bottom" onMouseUp="scaleClick(' + index + ', ' + i +
        ');"></td>';
  }
  result += '</tr>';

  // Row 4, left and right of range labels
  result += '<tr>';
  result += '<td colspan="10" class="left">' + left[index] +
      '</td><td colspan="10" class="right">' + right[index] + '</td>';
  result += '</tr></table></td>';

  // Now for the definition of the scale
  result += '<td class="def">';
  result += def[index];
  result += '</td></tr></table>';

  return result;
}

function onLoad() {
  // Get all the scales ready
  for (var i = 0; i < NUM_SCALES; i++) {
    document.getElementById('scale' + i).innerHTML = getScaleHTML(i);
  }
}

// Users want to proceed after doing the scales
function buttonPart1() {
  // Check to be sure they click on every scale
  for (var i = 0; i < NUM_SCALES; i++) {
    if (!results_rating[i]) {
      alert('A value must be selected for every scale!');
      return false;
    }
  }

  // Bye bye part 1, hello part 2
  document.getElementById('div_part1').style.display = 'none';
  document.getElementById('div_part2').style.display = '';

  return true;
}

// User done reading the part 2 instructions
function buttonPart2() {
  // Bye bye part 2, hello part 3
  document.getElementById('div_part2').style.display = 'none';
  document.getElementById('div_part3').style.display = '';

  // Set the labels for the buttons
  setPairLabels();
  return true;
}

// Set the button labels for the pairwise comparison stage
function setPairLabels() {
  var indexes = new Array();
  indexes = pair[pair_num].split(' ');

  var pair1 = scale[indexes[0]];
  var pair2 = scale[indexes[1]];

  document.getElementById('pair1').value = pair1;
  document.getElementById('pair2').value = pair2;

  document.getElementById('pair1_def').innerHTML = def[indexes[0]];
  document.getElementById('pair2_def').innerHTML = def[indexes[1]];
}

// They clicked the top pair button
function buttonPair1() {
  var indexes = new Array();
  indexes = pair[pair_num].split(' ');
  results_tally[indexes[0]]++;

  nextPair();
  return true;
}

// They clicked the bottom pair button
function buttonPair2() {
  var indexes = new Array();
  indexes = pair[pair_num].split(' ');
  results_tally[indexes[1]]++;
  nextPair();
  return true;
}

// Compute the weights and the final score
function calcResults() {
  results_overall = 0.0;

  for (var i = 0; i < NUM_SCALES; i++) {
    results_weight[i] = results_tally[i] / 15.0;
    results_overall += results_weight[i] * results_rating[i];
  }
}

// Output the table of results
function getResultsHTML() {
  var result = '';

  result +=
      '<table><tr><td></td><td>Rating</td><td>Tally</td><td>Weight</td></tr>';
  for (var i = 0; i < NUM_SCALES; i++) {
    result += '<tr>';

    result += '<td>';
    result += scale[i];
    result += '</td>';

    result += '<td>';
    result += results_rating[i];
    result += '</td>';

    result += '<td>';
    result += results_tally[i];
    result += '</td>';

    result += '<td>';
    result += results_weight[i];
    result += '</td>';

    result += '</tr>';
  }

  result += '</table>';
  result += '<br/>';
  result += 'Overall = ';
  result += results_overall;
  result += '<br/>';

  return result;
}

// Move to the next pair
function nextPair() {
  pair_num++;
  if (pair_num >= 15) {
    document.getElementById('div_part3').style.display = 'none';
    document.getElementById('div_part4').style.display = '';
    calcResults();
    document.getElementById('div_part4').innerHTML = getResultsHTML();
  } else {
    setPairLabels();
  }
}

let activeCondition = 'LLM';  // Initial active button

/**
 * prompt:
 * write html, two buttons, condition AAA and condition BBB, by default AAA is
 * highlighted with grey background, when clicking BBB, AAA will be white
 * background and BBB will become actived with grey background, also one can use
 * javascript to query which condition is selected.
 */
// Function to toggle active state
function toggle(buttonId) {
  document.getElementById(activeCondition).classList.remove('active');
  document.getElementById(buttonId).classList.add('active');
  activeCondition = buttonId;
}

// Function to query active button
function queryActiveCondition() {
  return activeCondition;
}

/**
 * prompt:
 * given an array of results_rating, `<input id="pid" type="number" value="1"
 />`, a variable called `condition`, when the user trigger `buttonSubmit()`
 event, save results_rating, pid, condition into a json file and let user
 download locally.
 */
function buttonSubmit() {
  // Get data from inputs
  const pid = parseInt(document.getElementById('pid').value, 10);
  const condition = queryActiveCondition();

  // Create a JSON object
  const jsonData = {pid, condition, results_rating};

  // Convert JSON object to a JSON string
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Create a blob from the JSON string
  const blob = new Blob([jsonString], {type: 'application/json'});

  // Create a link element
  const a = document.createElement('a');

  // Set link attributes and trigger download
  a.href = URL.createObjectURL(blob);
  a.download = pid + '-' + condition + '.json';
  a.click();
}
