import Module from '../models/Module.js';

export const createModule = async (req, res) => {
  try {
    const module = new Module(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du module' });
  }
};

export const updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!module) {
      return res.status(404).json({ message: 'Module non trouvé' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du module' });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);
    if (!module) {
      return res.status(404).json({ message: 'Module non trouvé' });
    }
    res.json({ message: 'Module supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du module' });
  }
};