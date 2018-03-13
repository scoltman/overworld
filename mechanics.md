Core Mechanics
if Stability < 0 player collapses (lost with 0 Certainty)
if Stability > 100 then Certainty ++1
if Anxiety > 100 then character will flee (lost with 0 Certainty)
if Anxiety < 0 then Certainty ++1
if Certainty > 100 then Stability --1
if Certainty < 0 then Anxiety ++1

too much certainty will make you a zealot
too much anxiety will drive you too despair
too much stability will make you steadfast

a lack of stability will drive you madness
a lack of certainty will make you a skeptic
a lack of anxiety will make you complacent

primary attacks
{judge}
  ++anxiety
{critique}
 --stability

secondary attacks
 {doubt}
  --certainty
  --stability
 {question}
  ++anxiety
  --certainty
