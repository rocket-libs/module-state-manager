export default abstract class ModuleStateManager<TRepository extends object, TModel extends object = any> {
    public abstract repository: TRepository;
    public abstract model: TModel;

    public setRerender(rerender: () => void): void {
        this.rerender = rerender;
    }

    private rerender: () => void = () => {
        throw new Error("Rerender not implemented. Please call setRerender()");
    };

    public updateRepository(partialRepository: Partial<TRepository>) {
        if (!this.repository) {
            throw new Error("Repository not yet set");
        }
        this.updateObject(this.repository, partialRepository);
    }

    public updateModel(partialModel: Partial<TModel>) {
        if (!this.model) {
            throw new Error("Model not yet set");
        }
        this.updateObject(this.model, partialModel);
    }

    private updateObject<TTarget extends object>(targetObject: TTarget, partialState: Partial<TTarget>) {
        const targetProperties = Object.keys(partialState);
        for (const property of targetProperties) {
            Reflect.set(targetObject, property, Reflect.get(partialState, property));
        }
        this.rerender();
    }
}
