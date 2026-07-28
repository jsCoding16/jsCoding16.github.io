document.addEventListener("DOMContentLoaded", () => {
    // === Mapeamento dos botões (IDs) para as opções do resumo (IDs) ===
    const configMapping = {
        // Enchimento (Cushion Filling)
        filling: {
            wrapperId: "wrapper_filling",
            options: {
                "Mole": "opt_lbl_soft",
                "ExtraM": "opt_lbl_extra_soft"
            }
        },
        // Madeiras (Frame Wood)
        wood: {
            wrapperId: "wrapper_wood",
            options: {
                "Mclara": "opt_wood_light_nordic",
                "Mmed": "opt_wood_light_natural",
                "Mmed2": "opt_wood_medium_warm",
                "Mescura": "opt_wood_dark_charcoal"
            }
        },
        // Peles (Leather)
        leather: {
            wrapperId: "wrapper_leather",
            options: {
                "Pele": "opt_leather_ivory",
                "Pele2": "opt_leather_cognac",
                "Pele3": "opt_leather_cocoa",
                "Pele4": "opt_leather_onyx"
            }
        }
    };
    
    const btnOrcamento = document.getElementById("orc");
    const modal = document.getElementById("modal_orcamento");
    const modal_sucesso = document.getElementById("modal_sucesso");
    const overlay = document.getElementById("modal_overlay");
    const btnClose = document.getElementById("close_modal");
    const btnClose_sucesso = document.getElementById("close_modal_sucesso");

    // === Função Genérica para Atualizar a Visibilidade ===
    function updateSelection(categoryKey, clickedButtonId) {
        const category = configMapping[categoryKey];
        if (!category) return;

        const targetOptionId = category.options[clickedButtonId];
        if (!targetOptionId) return;

        // 1. Procura o wrapper correspondente
        const wrapper = document.getElementById(category.wrapperId);
        if (wrapper) {
            // Seleciona apenas os parágrafos de valor (.tit1) dentro do wrapper para esconder
            const options = wrapper.querySelectorAll("p.tit1");
            options.forEach(el => {
                el.style.setProperty("display", "none", "important");
            });
        }

        // 2. Mostra apenas o elemento selecionado de forma limpa
        const targetElement = document.getElementById(targetOptionId);
        if (targetElement) {
            targetElement.style.setProperty("display", "block", "important");
        }
    }

    // === Adicionar os Event Listeners aos Botões ===

    // Enchimento
    Object.keys(configMapping.filling.options).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", () => {
                updateSelection("filling", btnId);
                dispatchMaterialChange("filling", btnId);
            });
        }
    });

    // Madeiras
    Object.keys(configMapping.wood.options).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", () => {
                updateSelection("wood", btnId);
                dispatchMaterialChange("wood", btnId);
            });
        }
    });

    // Peles
    Object.keys(configMapping.leather.options).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", () => {
                updateSelection("leather", btnId);
                dispatchMaterialChange("leather", btnId);
            });
        }
    });

    // Função auxiliar para comunicar com o teu script do Three.js (se necessário)
    function dispatchMaterialChange(category, optionId) {
        const event = new CustomEvent("materialChanged", {
            detail: { category, optionId }
        });
        window.dispatchEvent(event);
    }
    
    

    // Abrir o modal
    if (btnOrcamento) {
        btnOrcamento.addEventListener("click", () => {
            modal.style.display = "block";
            overlay.style.display = "block";
        });
    }

    // Fechar o modal
    const closeModal = () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    };
    const closeModal_sucesso = () => {
        modal_sucesso.style.display = "none";
        overlay.style.display = "none";
    };
    
    
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnClose_sucesso) btnClose_sucesso.addEventListener("click", closeModal_sucesso);
    if (overlay) overlay.addEventListener("click", closeModal);

    
    // 📩 OPÇÃO 1: Envio Direto (Anónimo de Teste)
    document.getElementById("btn_send_direct")?.addEventListener("click", async () => {
		closeModal();
		modal_sucesso.style.display = "block";
        overlay.style.display = "block";
        
    });

    // 🟢 OPÇÃO 2: WhatsApp (Abre com texto pré-definido anónimo)
    document.getElementById("btn_send_whatsapp")?.addEventListener("click", () => {
        closeModal();
		modal_sucesso.style.display = "block";
        overlay.style.display = "block";
    });

    // ✉️ OPÇÃO 3: E-mail (Abre e-mail com texto pré-definido anónimo)
    document.getElementById("btn_send_email")?.addEventListener("click", () => {
        closeModal();
		modal_sucesso.style.display = "block";
        overlay.style.display = "block";
    });
    
});
