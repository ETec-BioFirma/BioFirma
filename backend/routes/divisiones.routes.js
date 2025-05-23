const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/authMiddleware');
const {
  getDivisiones,
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision
} = require('../controllers/divisiones.controller');

router.use(authMiddleware);

router.get('/', getDivisiones);
router.get('/:divisionId', getDivision);
router.post('/', createDivision);
router.put('/:divisionId', updateDivision);
router.delete('/:divisionId', deleteDivision);

module.exports = router;
